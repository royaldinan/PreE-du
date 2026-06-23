import React from 'react';

const PatternRealLife = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">🎯 Tujuan Aktivitas</h3>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar mengenali dan membuat pola berulang menggunakan benda atau gerakan.</p>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📦 Bahan yang Dibutuhkan</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Kertas warna-warni (atau kertas biasa + krayon)</li>
          <li>Gunting</li>
          <li>Benda-benda berwarna di sekitar (buku, pensil, mainan)</li>
          <li>Tangan dan kaki mereka sendiri!</li>
        </ul>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📝 Langkah-langkah</h3>
        <ol className="body-font text-lg text-[#6C757D] space-y-3 list-decimal list-inside">
          <li><strong>Aktivitas Gerakan:</strong> Buat pola tepuk tangan (tepuk-tepuk-diam, tepuk-tepuk-diam). Minta anak menirukan!</li>
          <li><strong>Aktivitas Benda:</strong> Susun kertas warna dengan pola (merah-biru-merah-biru-?). Minta anak lanjutkan!</li>
          <li>Minta anak membuat pola mereka sendiri untuk ditiru teman lain</li>
          <li>Variasi: gunakan suara (ding-dong-ding-dong), gerakan tubuh, atau benda berbeda</li>
        </ol>
      </div>

      <div className="bg-[#FFD166] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">💡 Tips untuk Fasilitator</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Mulai dengan pola sederhana (A-B-A-B) baru ke yang lebih kompleks (A-A-B-A-A-B)</li>
          <li>Jadikan seperti dance atau yel-yel agar lebih seru</li>
          <li>Puji kreativitas mereka saat membuat pola sendiri</li>
        </ul>
      </div>
    </div>
  );
};

export default PatternRealLife;
