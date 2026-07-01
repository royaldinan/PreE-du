import React from 'react';
import RealLifeCard from '../components/RealLifeCard';
import RealLifeList from '../components/RealLifeList';

const AlgorithmRealLife = () => {
  return (
    <div className="space-y-6">
      <RealLifeCard icon="🎯" title="Tujuan Aktivitas" index={0}>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar memberikan instruksi langkah demi langkah yang jelas dan tepat seperti programming.</p>
      </RealLifeCard>

      <RealLifeCard icon="📦" title="Bahan yang Dibutuhkan" index={1}>
        <RealLifeList>
          <li>Ruangan atau halaman yang cukup luas</li>
          <li>Tali, buku, atau benda sebagai penanda jalan</li>
          <li>Kertas dan pensil untuk mencatat instruksi (optional)</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="📝" title="Langkah-langkah" index={2}>
        <RealLifeList ordered>
          <li><strong>Game "Robot Friend":</strong> Satu anak jadi "robot" (mata tertutup atau tatapan kosong)</li>
          <li>Anak lain jadi "programmer" yang memberi instruksi: "maju 2 langkah", "belok kiri", "mundur 1 langkah"</li>
          <li>Tujuan: bawa robot ke target tertentu tanpa nabrak rintangan</li>
          <li>Ganti peran agar semua dapat kesempatan jadi robot dan programmer</li>
          <li>Diskusikan: instruksi mana yang jelas? Mana yang membingungkan?</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="💡" title="Tips untuk Fasilitator" tone="placeholder" index={3}>
        <RealLifeList>
          <li>Tekankan pentingnya instruksi yang SPESIFIK dan URUTANNYA benar</li>
          <li>Buat rintangan sederhana (kursi, tas) untuk menambah tantangan</li>
          <li>Anak belajar bahwa komputer hanya melakukan apa yang diperintahkan, persis seperti robot!</li>
        </RealLifeList>
      </RealLifeCard>
    </div>
  );
};

export default AlgorithmRealLife;
