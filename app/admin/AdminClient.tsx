'use client';

import React, { useState } from 'react';
import OrderActions from './OrderActions';
import { saveConfigBatch, addFrontPageContent, deleteFrontPageContent, saveSponsorshipPackage } from './actions';

export default function AdminClient({
  configs,
  contents,
  packages
}: {
  configs: any[],
  contents: any[],
  packages: any[]
}) {
  const [activeTab, setActiveTab] = useState<'configs' | 'contents' | 'packages'>('packages');

  // Config State
  const [localConfigs, setLocalConfigs] = useState({

    whatsapp: configs.find(c => c.key === 'whatsapp')?.value || '628...',
    instagram: configs.find(c => c.key === 'instagram')?.value || 'nxrden.store'
  });
  const [isSavingConfig, setIsSavingConfig] = useState(false);


  // Content State
  const [cmsCategory, setCmsCategory] = useState<'tiktok' | 'gallery'>('tiktok');
  const [tiktokId, setTiktokId] = useState('');
  const [isSavingTiktok, setIsSavingTiktok] = useState(false);
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string | null>(null);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  // Sponsorship Package State
  const defaultPackageState = {
    id: null as string | null,
    name: '', price: '', desc: '', accent: '#c084fc',
    features: '', cta: 'Get Started', popular: false, order: 0
  };
  const [newPackage, setNewPackage] = useState(defaultPackageState);
  const [isSavingPackage, setIsSavingPackage] = useState(false);

  // --- Handlers ---
  const handleSaveConfigs = async () => {
    setIsSavingConfig(true);
    const payload = Object.entries(localConfigs).map(([key, value]) => ({ key, value }));
    await saveConfigBatch(payload);
    setIsSavingConfig(false);
    alert('Konfigurasi berhasil disimpan!');
  };


  const handleAddTiktok = async (e: any) => {
    e.preventDefault();
    if (!tiktokId.trim()) return;
    setIsSavingTiktok(true);
    await addFrontPageContent('tiktok', tiktokId.trim(), '');
    setTiktokId('');
    setIsSavingTiktok(false);
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGalleryFile(file);
    setGalleryPreview(URL.createObjectURL(file));
  };

  const handleUploadGallery = async () => {
    if (!galleryFile) return;
    setIsUploadingGallery(true);
    const formData = new FormData();
    formData.append('file', galleryFile);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        await addFrontPageContent('gallery', data.url, '');
        setGalleryFile(null);
        setGalleryPreview(null);
        // Reset the file input
        const input = document.getElementById('gallery-file-input') as HTMLInputElement;
        if (input) input.value = '';
      } else {
        alert('Upload gagal: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Upload gagal, coba lagi.');
    }
    setIsUploadingGallery(false);
  };

  const handleSavePackage = async (e: any) => {
    e.preventDefault();
    setIsSavingPackage(true);
    await saveSponsorshipPackage(newPackage.id, {
      name: newPackage.name,
      price: newPackage.price,
      desc: newPackage.desc,
      accent: newPackage.accent,
      features: newPackage.features,
      cta: newPackage.cta,
      popular: newPackage.popular,
      order: newPackage.order
    });
    setNewPackage(defaultPackageState);
    setIsSavingPackage(false);
  };

  const handleEditPackage = (pkg: any) => {
    setNewPackage({ ...pkg });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#020202', color: '#fff' }}>
      {/* SIDEBAR NAVIGATION */}
      <aside style={{ 
        width: '260px', 
        background: '#0a0a0a', 
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px'
      }}>
        <div style={{ marginBottom: '40px', paddingLeft: '12px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '1px' }}>W2E <span className="text-accent">Admin</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px' }}>Control Panel v1.0</p>
        </div>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[

              { id: 'packages', label: '📦 Sponsorship Tiers' },
              { id: 'contents', label: '🖼️ Front Page CMS' }
            ].map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{ 
                    width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    background: activeTab === tab.id ? 'rgba(106, 36, 209, 0.1)' : 'transparent', 
                    color: activeTab === tab.id ? 'var(--accent-color)' : 'var(--text-secondary)', 
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { if(activeTab !== tab.id) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#fff' } }}
                  onMouseOut={(e) => { if(activeTab !== tab.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' } }}
                >
                  {tab.label}
                </button>
              </li>
            ))}
            
            <li style={{ marginTop: '24px' }}>
              <a href="/dashboard" style={{ 
                width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(168,85,247,0.3)', cursor: 'pointer',
                background: 'rgba(168,85,247,0.1)', color: '#c084fc', fontWeight: 600, textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(168,85,247,0.2)' }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(168,85,247,0.1)' }}>
                🤖 Buka Bot Dashboard ↗
              </a>
            </li>
          </ul>
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px', paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
           <button onClick={async () => {
             const { adminLogoutAction } = await import('./auth');
             await adminLogoutAction();
             window.location.reload();
           }} style={{ background: 'none', border: 'none', color: '#FF4D4D', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
             🚪 Keluar
           </button>
           <a href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block' }}>
            ← Back to Origin Web
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <header style={{ 
          height: '80px', 
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 40px',
          background: 'rgba(2,2,2,0.8)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Administrator</p>
              <p style={{ fontSize: '0.8rem', color: '#4DFF88' }}>System Active</p>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              W
            </div>
          </div>
        </header>
        
        <div style={{ padding: '40px', maxWidth: '1200px' }}>


          {/* --- TAB: CMS FRONT PAGE --- */}
          {activeTab === 'contents' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
              
              {/* Category Sub-tabs */}
              <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '12px', width: 'fit-content' }}>
                {[
                  { id: 'tiktok', label: '🎵 TikTok Videos' },
                  { id: 'gallery', label: '🖼️ Gallery Foto' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCmsCategory(cat.id as any)}
                    style={{
                      padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                      fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s',
                      background: cmsCategory === cat.id ? 'var(--accent-color)' : 'transparent',
                      color: cmsCategory === cat.id ? '#fff' : 'var(--text-secondary)',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* --- TIKTOK CATEGORY --- */}
              {cmsCategory === 'tiktok' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 2fr', gap: '24px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', height: 'fit-content' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Tambah Video TikTok</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>Masukkan hanya <strong>ID video</strong> TikTok-nya saja (angka panjang di URL-nya).</p>
                    <form onSubmit={handleAddTiktok} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: 7421849320123456789"
                        value={tiktokId}
                        onChange={e => setTiktokId(e.target.value)}
                        style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', outline: 'none', fontFamily: 'monospace' }}
                      />
                      <button disabled={isSavingTiktok} type="submit" style={{ background: 'var(--accent-color)', color: '#fff', padding: '12px', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                        {isSavingTiktok ? 'Menambahkan...' : '+ Tambah Video'}
                      </button>
                    </form>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Video TikTok Aktif</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {contents.filter(c => c.type === 'tiktok').length === 0 && (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Belum ada video TikTok.</p>
                      )}
                      {contents.filter(c => c.type === 'tiktok').map(c => (
                        <div key={c.id} style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '1.2rem' }}>🎵</span>
                            <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#ccc' }}>{c.value}</span>
                          </div>
                          <button onClick={() => deleteFrontPageContent(c.id)} style={{ background: 'rgba(255,77,77,0.15)', border: '1px solid rgba(255,77,77,0.3)', color: '#FF4D4D', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>Hapus</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- GALLERY CATEGORY --- */}
              {cmsCategory === 'gallery' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 2fr', gap: '24px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', height: 'fit-content' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Upload Foto Gallery</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>Format: JPG, PNG, WebP. Maks 5MB.</p>
                    
                    {/* Drop zone */}
                    <label
                      htmlFor="gallery-file-input"
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        border: '2px dashed rgba(255,255,255,0.15)', borderRadius: '12px', padding: '24px',
                        cursor: 'pointer', marginBottom: '16px', minHeight: '140px',
                        background: galleryPreview ? 'none' : 'rgba(255,255,255,0.02)',
                        overflow: 'hidden', position: 'relative',
                        transition: 'border-color 0.2s'
                      }}
                    >
                      {galleryPreview ? (
                        <img src={galleryPreview} alt="Preview" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />
                      ) : (
                        <>
                          <span style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📁</span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center' }}>Klik untuk pilih foto<br/><span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>Browse</span></span>
                        </>
                      )}
                    </label>
                    <input
                      id="gallery-file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleGalleryFileChange}
                      style={{ display: 'none' }}
                    />

                    {galleryFile && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>📎 {galleryFile.name}</p>
                    )}

                    <button
                      disabled={!galleryFile || isUploadingGallery}
                      onClick={handleUploadGallery}
                      style={{ width: '100%', background: galleryFile ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: galleryFile ? 'pointer' : 'not-allowed', opacity: !galleryFile ? 0.5 : 1 }}
                    >
                      {isUploadingGallery ? 'Mengupload...' : '⬆ Upload ke Gallery'}
                    </button>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Foto Gallery Aktif</h3>
                    {contents.filter(c => c.type === 'gallery').length === 0 && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Belum ada foto di gallery.</p>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
                      {contents.filter(c => c.type === 'gallery').map(c => (
                        <div key={c.id} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)', aspectRatio: '1' }}>
                          <img src={c.value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button
                            onClick={() => deleteFrontPageContent(c.id)}
                            style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, background: 'rgba(0,0,0,0)', border: 'none', color: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', transition: 'all 0.2s', fontWeight: 'bold' }}
                            onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,77,77,0.7)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                            onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0)'; (e.currentTarget as HTMLButtonElement).style.color = 'transparent'; }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- TAB: SPONSORSHIP TIER --- */}
          {activeTab === 'packages' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
              {newPackage.id && (
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', height: 'fit-content' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Edit Sponsorship Tier</h3>
                  <form onSubmit={handleSavePackage} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Nama Paket (cth: Starter)</label>
                    <input required type="text" value={newPackage.name} onChange={e => setNewPackage({...newPackage, name: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Harga (cth: Rp 150K)</label>
                    <input required type="text" value={newPackage.price} onChange={e => setNewPackage({...newPackage, price: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Deskripsi</label>
                    <textarea required value={newPackage.desc} onChange={e => setNewPackage({...newPackage, desc: e.target.value})} rows={2} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', outline: 'none', resize: 'vertical' }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Features (Pisahkan dengan baris baru / enter)</label>
                    <textarea required value={newPackage.features} onChange={e => setNewPackage({...newPackage, features: e.target.value})} rows={5} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', outline: 'none', resize: 'vertical' }} placeholder="1x Discord Announcement&#10;Mention in #general channel&#10;..." />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Warna Aksen (Hex, cth: #4D88FF)</label>
                    <input required type="text" value={newPackage.accent} onChange={e => setNewPackage({...newPackage, accent: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Teks Tombol (cth: Get Started)</label>
                    <input required type="text" value={newPackage.cta} onChange={e => setNewPackage({...newPackage, cta: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="checkbox" checked={newPackage.popular} onChange={e => setNewPackage({...newPackage, popular: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tandai sebagai "Most Popular"</label>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Urutan (Angka)</label>
                    <input required type="number" value={newPackage.order} onChange={e => setNewPackage({...newPackage, order: Number(e.target.value)})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <button disabled={isSavingPackage} type="submit" style={{ flex: 1, background: 'var(--accent-color)', color: '#fff', padding: '12px', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                      {isSavingPackage ? 'Menyimpan...' : 'Update Tier'}
                    </button>
                    <button type="button" onClick={() => setNewPackage(defaultPackageState)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                      Tutup
                    </button>
                  </div>
                </form>
              </div>
              )}

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Daftar Sponsorship Tiers</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                  {packages.map(p => (
                    <div key={p.id} style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${p.popular ? p.accent : 'rgba(255,255,255,0.1)'}`, borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ color: p.accent, fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          {p.name} {p.popular && '★'}
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleEditPackage(p)} style={{ background: 'none', border: 'none', color: '#4DFF88', cursor: 'pointer', fontSize: '0.9rem' }}>✎ Edit</button>
                        </div>
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>
                        {p.price}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px', flex: 1 }}>
                        {p.desc}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                        Order: {p.order}
                      </div>
                    </div>
                  ))}
                  {packages.length === 0 && (
                    <p style={{ color: 'var(--text-secondary)' }}>Belum ada tier. (Website akan menggunakan data bawaan jika kosong).</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
