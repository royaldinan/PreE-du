import React from 'react';

const PrototypeRealLife = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">🎯 Tujuan Aktivitas</h3>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar membuat prototipe sederhana untuk menguji solusi mereka terhadap masalah nyata.</p>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📦 Bahan yang Dibutuhkan</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Bahan daur ulang: kardus, botol plastik, kertas, sedotan</li>
          <li>Lakban, lem, gunting</li>
          <li>Pensil warna/spidol untuk dekorasi</li>
          <li>Tali, karet gelang, kancing (bahan tambahan)</li>
        </ul>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📝 Langkah-langkah</h3>
        <ol className="body-font text-lg text-[#6C757D] space-y-3 list-decimal list-inside">
          <li>Pilih MASALAH NYATA dari sesi ideation sebelumnya</li>
          <li>Minta anak memilih SATU ide untuk dibuat prototipenya</li>
          <li>Beri waktu 10-15 menit untuk membuat dengan bahan tersedia</li>
          <li>Ingatkan: tidak perlu sempurna, yang penting bisa DITES!</li>
          <li>Setiap anak/kelompok presentasi prototipe dan cara kerjanya</li>
          <li>Tes bersama: apakah solusinya bekerja? Apa yang perlu diperbaiki?</li>
        </ol>
      </div>

      <div className="bg-[#FFD166] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">💡 Tips untuk Fasilitator</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Fokus pada PROSES, bukan hasil akhir yang cantik</li>
          <li>Dorong iterasi: "Apa yang bisa ditambah/diperbaiki?"</li>
          <li>Jangan terlalu banyak membantu - biarkan mereka problem-solve sendiri</li>
          <li>Rayakan KEGAGALAN sebagai bagian belajar: "Wah, ternyata begini tidak berhasil. Kenapa ya?"</li>
        </ul>
      </div>
    </div>
  );
};

export default PrototypeRealLife;
