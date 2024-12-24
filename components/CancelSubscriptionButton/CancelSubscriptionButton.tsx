'use client';
import { cancelSubscription } from '@/actions/subscription';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const CancelSubscriptionButton = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      if (!session?.user?.email) {
        throw new Error('Non autorisé.');
      }
      const response = await cancelSubscription(session?.user?.email);

      if (response.success) {
        setMessage('Votre abonnement a été annulé avec succès.');
      } else {
        setError(response.message || 'Une erreur est survenue.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Une erreur est survenue.');
      } else {
        setError('Une erreur est survenue.');
      }
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  return (
    <div>
      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          disabled={loading}
          className='bg-red-500 text-white px-4 py-2 rounded'
        >
          {loading ? 'Annulation...' : "Annuler l'abonnement"}
        </button>
      ) : (
        <div className='mt-2'>
          <p>Êtes-vous sûr de vouloir annuler votre abonnement ?</p>
          <button
            onClick={handleCancel}
            disabled={loading}
            className='bg-red-600 text-white px-4 py-2 rounded mr-2'
          >
            Oui, annuler
          </button>
          <button
            onClick={() => setConfirm(false)}
            disabled={loading}
            className='bg-gray-300 text-black px-4 py-2 rounded'
          >
            Non
          </button>
        </div>
      )}
      {message && <p className='text-green-500 mt-2'>{message}</p>}
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
};

export default CancelSubscriptionButton;
