export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-color)',
      position: 'relative',
      zIndex: 9999
    }}>
      <div style={{
        width: '24px',
        height: '24px',
        border: '2px solid rgba(255,255,255,0.1)',
        borderTopColor: 'var(--accent-color)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}></div>
    </div>
  );
}
