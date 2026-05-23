'use client';
import { updateOrderStatus } from './actions';

export default function OrderActions({ orderId, status }: { orderId: string, status: string }) {
  if (status !== 'PENDING') return null;

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
       <button 
         onClick={() => updateOrderStatus(orderId, 'SUCCESS')} 
         style={{ background: 'rgba(77, 255, 136, 0.2)', color: '#4DFF88', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #4DFF88', fontWeight: 'bold', fontSize: '0.75rem' }}
       >
         Terima
       </button>
       <button 
         onClick={() => updateOrderStatus(orderId, 'FAILED')} 
         style={{ background: 'rgba(255, 77, 77, 0.2)', color: '#FF4D4D', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #FF4D4D', fontWeight: 'bold', fontSize: '0.75rem' }}
       >
         Tolak
       </button>
    </div>
  );
}
