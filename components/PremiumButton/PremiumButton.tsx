'use client';
import { useState } from 'react';
import { Button } from '../ui/button';

const PremiumButton = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error initiating checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={loading}
      className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
    >
      {loading ? 'Chargement...' : 'Souscrire au Premium'}
    </Button>
  );
};

export default PremiumButton;
