'use client';

import { useState, useEffect } from 'react';

// Ikut styling lucide-react jika diperlukan, kalau tidak pakai svg biasa
export default function RobuxCalculator({ onBuy }: { onBuy: (product: any) => void }) {
    const [mode, setMode] = useState<'5days' | 'gamepass'>('5days');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState(0);
    
    // Konfigurasi rates kita hardcode untuk default, namun idealnya bisa di-fetch dari backend
    const [rates, setRates] = useState({ rate5Days: 95, rateGamepass: 120 });

    // Kalau nanti ada route /api/config, fetch dari sana here

    useEffect(() => {
        const val = parseFloat(amount) || 0;
        const ratePerRobux = mode === '5days' ? rates.rate5Days : rates.rateGamepass;
        setPrice(val * ratePerRobux);
    }, [amount, mode, rates]);

    const handleBuy = () => {
        if (!amount || price <= 0) return;
        
        const name = `${amount} Robux (${mode === '5days' ? '5 Days' : 'Gamepass'})`;

        onBuy({
            id: `custom_${mode}_${amount}`,
            name: name,
            price: price,
            priceDisplay: `Rp ${price.toLocaleString('id-ID')}`,
            category: 'Custom Order',
            buyType: mode
        });
    };

    return (
        <div style={{
            background: 'var(--surface-color)',
            border: '1px solid rgba(106, 36, 209, 0.4)',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 0 40px rgba(106, 36, 209, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            width: '100%'
        }}>
            {/* Top gradient */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #6A24D1, #8C52FF)' }}></div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px', color: '#fff' }}>Custom Robux Order</h3>

            {/* Mode tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <button 
                    onClick={() => setMode('5days')} 
                    style={{ flex: 1, padding: '12px', borderRadius: '12px', fontWeight: 600, transition: 'all 0.3s', 
                             background: mode === '5days' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)', 
                             color: mode === '5days' ? '#fff' : 'var(--text-secondary)',
                             border: 'none', cursor: 'pointer' }}
                >
                    ⚡ 5 Days
                </button>
                <button 
                    onClick={() => setMode('gamepass')} 
                    style={{ flex: 1, padding: '12px', borderRadius: '12px', fontWeight: 600, transition: 'all 0.3s', 
                             background: mode === 'gamepass' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)', 
                             color: mode === 'gamepass' ? '#fff' : 'var(--text-secondary)',
                             border: 'none', cursor: 'pointer' }}
                >
                    🎮 Gamepass
                </button>
            </div>

            {/* Input Block */}
            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>
                    Amount (Robux)
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. 1000"
                        style={{
                            width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', 
                            borderRadius: '12px', padding: '14px 16px',
                            color: '#fff', fontSize: '1rem', outline: 'none', fontFamily: 'monospace'
                        }}
                    />
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                    Rate: Rp {mode === '5days' ? rates.rate5Days : rates.rateGamepass} / Robux
                </p>
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(140, 82, 255, 0.1)', padding: '16px', borderRadius: '12px', marginBottom: '32px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total (IDR)</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-color)', fontFamily: 'monospace' }}>
                    Rp {price.toLocaleString('id-ID')}
                </span>
            </div>

            <button
                onClick={handleBuy}
                disabled={!amount || price <= 0}
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '1.1rem', opacity: (!amount || price <= 0) ? 0.5 : 1 }}
            >
                Order Now
            </button>
        </div>
    );
}
