import React from 'react';

const AlgorithmRealLife = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">🎯 Tujuan Aktivitas</h3>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar memberikan instruksi langkah demi langkah yang jelas dan tepat seperti programming.</p>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📦 Bahan yang Dibutuhkan</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Ruangan atau halaman yang cukup luas</li>
          <li>Tali, buku, atau benda sebagai penanda jalan</li>
          <li>Kertas dan pensil untuk mencatat instruksi (optional)</li>
        </ul>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📝 Langkah-langkah</h3>
        <ol className="body-font text-lg text-[#6C757D] space-y-3 list-decimal list-inside">
          <li><strong>Game "Robot Friend":</strong> Satu anak jadi "robot" (mata tertutup atau tatapan kosong)</li>
          <li>Anak lain jadi "programmer" yang memberi instruksi: "maju 2 langkah", "belok kiri", "mundur 1 langkah"</li>
          <li>Tujuan: bawa robot ke target tertentu tanpa nabrak rintangan</li>
          <li>Ganti peran agar semua dapat kesempatan jadi robot dan programmer</li>
          <li>Diskusikan: instruksi mana yang jelas? Mana yang membingungkan?</li>
        </ol>
      </div>

      <div className="bg-[#FFD166] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">💡 Tips untuk Fasilitator</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Tekankan pentingnya instruksi yang SPESIFIK dan URUTANNYA benar</li>
          <li>Buat rintangan sederhana (kursi, tas) untuk menambah tantangan</li>
          <li>Anak belajar bahwa komputer hanya melakukan apa yang diperintahkan, persis seperti robot!</li>
        </ul>
      </div>
    </div>
  );
};

export default AlgorithmRealLife;
