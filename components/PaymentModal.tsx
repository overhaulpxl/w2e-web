'use client';

import { useState, useEffect } from 'react';
import { generateDynamicQRIS } from '@/lib/qris';
import { QRCodeSVG } from 'qrcode.react';

export default function PaymentModal({ 
    isOpen, 
    onClose, 
    product 
}: { 
    isOpen: boolean;
    onClose: () => void;
    product: any;
}) {
    const [step, setStep] = useState<'input' | 'payment' | 'success' | 'review'>('input');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        backupCode: '',
        whatsapp: '',
    });
    const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setStep('input');
            setFormData({ username: '', password: '', backupCode: '', whatsapp: '' });
            setReviewData({ rating: 5, comment: '' });
            setShowPassword(false);
        }
    }, [isOpen]);

    if (!isOpen || !product) return null;

    // Use a default static QRIS code or load from env
    const BASE_QRIS = process.env.NEXT_PUBLIC_QRIS_STATIC || "00020101021126610014COM.GO-JEK.WWW01189360091438384483020210G8384483020303UMI51440014ID.CO.QRIS.WWW0215ID10254267424050303UMI5204899953033605802ID5925NXRDEN, Digital & Kreatif6007CIANJUR61054325362070703A016304A48B";
    const qrData = generateDynamicQRIS(BASE_QRIS, product.price);

    const handleContinue = () => {
        if (!formData.username.trim() || !formData.whatsapp.trim()) return;
        setStep('payment');
    };

    const handleCheckStatus = async () => {
        setIsLoading(true);
        try {
            // Kita pakai JSON karena paymentProof image sudah kita tiadakan di flow QRIS ini
            const payload = {
                buyType: product.buyType || 'gamepass',
                amount: product.price,
                packagePrice: product.price,
                packageName: product.name,
                robloxUser: formData.username,
                robloxPass: formData.password,
                backupCode: formData.backupCode,
                whatsapp: formData.whatsapp
            };

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create order');
            }

            setStep('success');
        } catch (error: any) {
            console.error("Order failed", error);
            alert("Failed to create order: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReviewSubmit = async () => {
        setIsLoading(true);
        try {
            await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.username,
                    rating: reviewData.rating,
                    comment: reviewData.comment
                })
            });
            onClose();
        } catch (error) {
            console.error("Failed to submit review", error);
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ background: 'var(--surface-color)', padding: '40px', borderRadius: '32px', width: '100%', maxWidth: '480px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', boxShadow: '0 24px 48px rgba(0,0,0,0.6), 0 0 40px rgba(140, 82, 255, 0.05)' }}>
                
                <button onClick={onClose} style={{ position: 'absolute', top: '32px', right: '32px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '1.25rem', cursor: 'pointer', transition: 'color 0.2s ease' }} onMouseOver={e => e.currentTarget.style.color='#fff'} onMouseOut={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>✕</button>
                
                <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#fff', fontWeight: 600, letterSpacing: '-0.03em' }}>
                    {step === 'input' ? 'Account Details' : step === 'payment' ? 'Scan & Pay' : step === 'success' ? 'Order Placed!' : 'Rate Your Experience'}
                </h2>
                
                {(step === 'input' || step === 'payment') && (
                    <div style={{ background: 'rgba(140, 82, 255, 0.05)', border: '1px solid rgba(140, 82, 255, 0.1)', padding: '16px 20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                        <span style={{ fontSize: '0.95rem', color: '#fff' }}>{product.name}</span>
                        <span style={{ fontSize: '0.95rem', color: 'var(--accent-color)', fontWeight: 600 }}>{product.priceDisplay}</span>
                    </div>
                )}

                {step === 'input' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* input fields remain unchanged here from previous view */}
                        <div>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Roblox Username</label>
                            <input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        </div>
                        
                        {(product.buyType === '5days' || product.name.includes('5 Days')) && (
                            <>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Roblox Password</label>
                                    <input type={showPassword ? "text" : "password"} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Backup Code (Optional)</label>
                                    <input type="text" value={formData.backupCode} onChange={e => setFormData({...formData, backupCode: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                                </div>
                            </>
                        )}

                        <div>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>WhatsApp Number</label>
                            <input type="text" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} placeholder="08..." style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        </div>

                        <button onClick={handleContinue} disabled={!formData.username.trim() || !formData.whatsapp.trim()} className="btn btn-primary" style={{ width: '100%', padding: '16px', marginTop: '8px', cursor: (!formData.username.trim() || !formData.whatsapp.trim()) ? 'not-allowed' : 'pointer', opacity: (!formData.username.trim() || !formData.whatsapp.trim()) ? 0.5 : 1 }}>
                            Continue
                        </button>
                    </div>
                )}

                {step === 'payment' && (
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                        <div style={{ padding: '16px', background: '#fff', borderRadius: '16px', display: 'inline-block' }}>
                            <QRCodeSVG value={qrData} size={200} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Scan QRIS via M-Banking / E-Wallet</p>
                            <p style={{ fontSize: '1.25rem', color: 'var(--accent-color)', fontWeight: 700, marginTop: '8px' }}>{product.priceDisplay}</p>
                        </div>
                        
                        <button onClick={handleCheckStatus} disabled={isLoading} className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                            {isLoading ? 'Processing...' : 'I Have Paid'}
                        </button>
                    </div>
                )}

                {step === 'success' && (
                    <div style={{ textAlign: 'center', padding: '24px 0' }}>
                        <div style={{ width: '64px', height: '64px', background: 'rgba(46, 204, 113, 0.2)', color: '#2ecc71', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', fontSize: '2rem' }}>
                            ✓
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Order Submitted</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '32px' }}>Your order is now waiting for admin verification.</p>
                        
                        <button onClick={() => setStep('review')} className="btn btn-primary" style={{ padding: '12px 32px', width: '100%', marginBottom: '12px' }}>
                            Leave a Review
                        </button>
                        <button onClick={onClose} className="btn btn-outline" style={{ padding: '12px 32px', width: '100%' }}>
                            Close
                        </button>
                    </div>
                )}

                {step === 'review' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block', textAlign: 'center' }}>How was your experience?</label>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button 
                                        key={star}
                                        onClick={() => setReviewData({...reviewData, rating: star})}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: reviewData.rating >= star ? '#fbbf24' : 'rgba(255,255,255,0.2)' }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Comment (Optional)</label>
                            <textarea 
                                value={reviewData.comment} 
                                onChange={e => setReviewData({...reviewData, comment: e.target.value})} 
                                placeholder="Fast process, legit!"
                                style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', minHeight: '100px', resize: 'vertical' }} 
                            />
                        </div>

                        <button onClick={handleReviewSubmit} disabled={isLoading} className="btn btn-primary" style={{ width: '100%', padding: '16px', marginTop: '8px' }}>
                            {isLoading ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
