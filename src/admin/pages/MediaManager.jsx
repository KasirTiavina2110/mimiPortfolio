import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../lib/supabase';
import { useMedia } from '../hooks/useMedia';
import AdminNav from '../components/AdminNav';
import '../css/MediaManager.css';

const SECTIONS = [
  { key:'hero',         label:'Hero',           description:'Photo de fond',          bucket:'portfolio-media', folder:'hero',         accept:'image/*', type:'image',
    localFilenames:['stetoscope2.jpg'] },
  { key:'about',        label:'À propos',        description:'Photo de profil',        bucket:'portfolio-media', folder:'about',        accept:'image/*', type:'image',
    localFilenames:['FutureDR.PNG','Mihary.jpg'] },
  { key:'shoes-video',  label:'Shoes — Vidéo',   description:'Vidéo de présentation',  bucket:'portfolio-media', folder:'shoes',        accept:'video/*', type:'video',
    localFilenames:['Shoes_custom.mp4'] },
  { key:'tote-bags',    label:'Tote Bags',       description:'Galerie (max 15)',        bucket:'portfolio-media', folder:'tote-bags',    accept:'image/*', type:'image', multiple:true,
    localFilenames:['TotebagMirindra.jpeg','ToteBagGrace.jpeg','TotebagFijerinaoo.jpeg','TotebagMirindra2.jpeg','TotebagNatiora.jpeg','TotebagGrace2.jpeg','TotebagLiberty.jpeg','TotebagNofyBoky.jpeg','TotebagProud.jpeg','TotebagLiberty2.jpeg','TotebagMiavaka.jpeg','TotebagCalmeMaman.jpeg','TotebagTsaraIanao.jpeg','TotebagLokoyTontolo.jpeg','ToteBagAncreFleur.jpeg'] },
  { key:'paintings',    label:'Peintures',       description:'Portraits (max 20)',      bucket:'portfolio-media', folder:'paintings',    accept:'image/*', type:'image', multiple:true,
    localFilenames:['Portrait11.jpeg','Portrait12.jpeg','Portrait13.jpeg','Portrait14.jpeg','Portrait15.jpeg','Portrait16.jpeg','Portrait17.jpeg','Portrait18.jpeg','Portrait19.jpeg','Portrait20.jpeg','Portrait21.jpeg','Portrait22.jpeg','Portrait23.jpeg','Portrait24.jpeg','Portrait25.jpeg','Portrait26.jpeg','PortraitGars.PNG','Kasir1.jpeg','Kasir2.jpeg'] },
  { key:'caps',         label:'Graduation Caps', description:'Chapeaux (max 15)',       bucket:'portfolio-media', folder:'caps',         accept:'image/*', type:'image', multiple:true,
    localFilenames:['EVERYTHING.jpeg','GodGRACE.jpeg','GUG.jpeg','Jesus.jpeg','MahayMiotra.jpeg','Mortaroboard1.jpg','Motaroaboard_Jesus.jpg','Motaroaboard2.jpg','Motaroaboard3.jpg','THXDADMUM.jpeg','THXGod.jpeg','THXGODBLESS.jpeg'] },
  { key:'shoes-photos', label:'Shoes — Photos',  description:'Photos custom (max 10)',  bucket:'portfolio-media', folder:'shoes-photos', accept:'image/*', type:'image', multiple:true,
    localFilenames:['Shoes_Obito.jpg','Shoes_RedBull.jpg'] },
];

const ALLOWED_IMAGE_TYPES = ['image/jpeg','image/jpg','image/png','image/webp','image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4','video/webm','video/ogg','video/quicktime'];
const MAX_IMG_MB = 8;
const MAX_VID_MB = 150;
const MAX_FILES  = 20;

function validateFiles(files, type) {
  if (files.length > MAX_FILES) return `Maximum ${MAX_FILES} fichiers à la fois.`;
  for (const f of files) {
    const mb      = f.size / 1024 / 1024;
    const maxMB   = type === 'video' ? MAX_VID_MB : MAX_IMG_MB;
    const allowed = type === 'video' ? ALLOWED_VIDEO_TYPES : ALLOWED_IMAGE_TYPES;
    const exts    = type === 'video' ? ['mp4','webm','ogg','mov'] : ['jpg','jpeg','png','webp','gif'];
    const ext     = f.name.split('.').pop()?.toLowerCase();
    if (!allowed.includes(f.type))   return `"${f.name}" — type MIME non autorisé (${f.type || '?'}).`;
    if (!exts.includes(ext))         return `"${f.name}" — extension .${ext} non autorisée.`;
    if (mb > maxMB)                  return `"${f.name}" dépasse ${maxMB} Mo (${mb.toFixed(1)} Mo).`;
    if (f.size < 100)                return `"${f.name}" semble vide ou corrompu.`;
  }
  return null;
}

// ── Zone d'upload + liste des fichiers existants ──────────
function SectionPanel({ section }) {
  const [files,    setFiles]    = useState([]);      // fichiers dans le bucket
  const [loadingF, setLoadingF] = useState(true);
  const [status,   setStatus]   = useState('idle');
  const [progress, setProgress] = useState(0);
  const [message,  setMessage]  = useState('');
  const [preview,  setPreview]  = useState(null);
  const [deleting, setDeleting] = useState(null);    // nom du fichier en cours de suppression
  const inputRef = useRef(null);

  // Détection des conflits : on passe les noms locaux comme strings simples
  const localItems = (section.localFilenames || []).map(name => ({ src: name, name }));
  const { errors: conflictErrors } = useMedia(section.folder, localItems);

  // Charger la liste des fichiers existants dans ce dossier
  const loadFiles = useCallback(async () => {
    setLoadingF(true);
    const { data, error } = await supabase.storage
      .from(section.bucket)
      .list(section.folder, { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
    if (!error && data) {
      setFiles(data.filter(f => f.name !== '.emptyFolderPlaceholder'));
    }
    setLoadingF(false);
  }, [section]);

  useEffect(() => { loadFiles(); }, [loadFiles]);

  // Upload
  const handleFiles = async (rawFiles) => {
    if (!rawFiles.length) return;
    const err = validateFiles(rawFiles, section.type);
    if (err) { setMessage(err); setStatus('error'); return; }
    if (section.type === 'image' && rawFiles.length === 1) {
      setPreview(URL.createObjectURL(rawFiles[0]));
    }
    setStatus('uploading'); setMessage(''); setProgress(0);
    try {
      let done = 0;
      for (const file of rawFiles) {
        const safe = file.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9._-]/g,'_');
        const { error } = await supabase.storage
          .from(section.bucket)
          .upload(`${section.folder}/${safe}`, file, { upsert: true, contentType: file.type });
        if (error) throw error;
        done++;
        setProgress(Math.round((done / rawFiles.length) * 100));
      }
      setStatus('success');
      setMessage(rawFiles.length > 1 ? `${rawFiles.length} fichiers uploadés.` : `"${rawFiles[0].name}" uploadé.`);
      loadFiles();
      setTimeout(() => { setStatus('idle'); setMessage(''); setPreview(null); }, 3500);
    } catch (e) {
      setStatus('error');
      setMessage(`Erreur upload : ${e.message}`);
    }
  };

  // Suppression
  const handleDelete = async (fileName) => {
    if (!confirm(`Supprimer "${fileName}" ?`)) return;
    setDeleting(fileName);
    const { error } = await supabase.storage
      .from(section.bucket)
      .remove([`${section.folder}/${fileName}`]);
    if (error) {
      alert(`Erreur suppression : ${error.message}`);
    } else {
      loadFiles();
    }
    setDeleting(null);
  };

  const getPublicUrl = (name) =>
    supabase.storage.from(section.bucket).getPublicUrl(`${section.folder}/${name}`).data.publicUrl;

  return (
    <div className="section-panel">
      {/* Bannière conflits — visible uniquement en admin */}
      {conflictErrors?.length > 0 && (
        <div className="mm-conflict-banner">
          <span className="mm-conflict-banner__icon">⚠</span>
          <div>
            <p className="mm-conflict-banner__title">Conflit de noms détecté</p>
            <p className="mm-conflict-banner__msg">
              Ces fichiers ont le même nom que des assets locaux et sont ignorés sur le site.
              Renomme-les dans Supabase pour les afficher :
            </p>
            <ul className="mm-conflict-banner__list">
              {conflictErrors.map(name => (
                <li key={name}><code>{name}</code></li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* Zone upload */}
      <div className="upload-zone-wrap">
        {preview && <img src={preview} alt="aperçu" className="upload-preview" />}
        <div
          className={`upload-zone upload-zone--${status}`}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); handleFiles(Array.from(e.dataTransfer.files)); }}
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept={section.accept}
            multiple={!!section.multiple} style={{ display:'none' }}
            onChange={e => handleFiles(Array.from(e.target.files))} />
          {status === 'uploading' ? (
            <div className="upload-progress">
              <div className="upload-bar-track"><div className="upload-bar-fill" style={{ width:`${progress}%` }}/></div>
              <span className="upload-pct">{progress}%</span>
            </div>
          ) : (
            <>
              <span className="upload-icon">{section.type === 'video' ? '▶' : '⬆'}</span>
              <p className="upload-main">Glisse ou clique pour uploader</p>
              <p className="upload-sub">
                {section.type === 'image'
                  ? `JPG · PNG · WEBP · GIF — max ${MAX_IMG_MB} Mo/image`
                  : `MP4 · WEBM · MOV — max ${MAX_VID_MB} Mo`}
              </p>
            </>
          )}
        </div>
        {message && <p className={`upload-msg upload-msg--${status}`}>{message}</p>}
      </div>

      {/* Liste des fichiers existants */}
      <div className="file-list-wrap">
        <p className="file-list__title">
          Fichiers dans ce dossier
          {!loadingF && <span className="file-list__count"> ({files.length})</span>}
        </p>
        {loadingF ? (
          <p className="file-list__empty">Chargement…</p>
        ) : files.length === 0 ? (
          <p className="file-list__empty">Aucun fichier — uploader pour commencer</p>
        ) : (
          <ul className="file-list">
            {files.map(f => (
              <li key={f.name} className="file-item">
                {/* Miniature */}
                {section.type === 'image' ? (
                  <img src={getPublicUrl(f.name)} alt={f.name} className="file-item__thumb" />
                ) : (
                  <div className="file-item__thumb file-item__thumb--video">▶</div>
                )}
                {/* Infos */}
                <div className="file-item__info">
                  <p className="file-item__name">{f.name}</p>
                  <p className="file-item__size">
                    {f.metadata?.size ? `${(f.metadata.size / 1024).toFixed(0)} Ko` : '—'}
                  </p>
                </div>
                {/* Actions */}
                <div className="file-item__actions">
                  <a href={getPublicUrl(f.name)} target="_blank" rel="noreferrer"
                    className="file-btn file-btn--view" title="Voir">👁</a>
                  <button
                    className="file-btn file-btn--delete"
                    onClick={() => handleDelete(f.name)}
                    disabled={deleting === f.name}
                    title="Supprimer"
                  >
                    {deleting === f.name ? '…' : '🗑'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

SectionPanel.propTypes = {
  section: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    bucket: PropTypes.string.isRequired,
    folder: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['image','video']).isRequired,
    multiple: PropTypes.bool,
    localFilenames: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default function MediaManager() {
  const [open, setOpen] = useState(null);
  return (
    <div className="adm-layout">
      <AdminNav />
      <main className="adm-main">
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Médias</h1>
            <p className="dash-subtitle">Gérer les images et vidéos du site</p>
          </div>
        </div>
        <p className="mm-intro">
          Clique sur une section pour uploader ou supprimer des fichiers.
          Les modifications sont visibles sur le site après déploiement.
        </p>
        <div className="mm-grid">
          {SECTIONS.map(s => (
            <div key={s.key} className={`mm-card ${open === s.key ? 'is-open' : ''}`}>
              <div className="mm-card__header" onClick={() => setOpen(open === s.key ? null : s.key)}>
                <div className="mm-card__info">
                  <p className="mm-card__label">{s.label}</p>
                  <p className="mm-card__desc">{s.description}</p>
                </div>
                <div className="mm-card__meta">
                  <span className={`mm-card__type mm-card__type--${s.type}`}>{s.type}</span>
                  <span className="mm-card__arrow">›</span>
                </div>
              </div>
              {open === s.key && (
                <div className="mm-card__body"><SectionPanel section={s} /></div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}