import React from 'react';

const OddOneOutRealLife = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">🎯 Tujuan Aktivitas</h3>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar mengidentifikasi benda yang berbeda dan menjelaskan alasan logis di balik pilihan mereka.</p>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📦 Bahan yang Dibutuhkan</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Benda-benda di sekitar kelas/ruangan (pensil, penghapus, buku, apel, mainan, dll)</li>
          <li>Meja atau lantai sebagai area permainan</li>
        </ul>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📝 Langkah-langkah</h3>
        <ol className="body-font text-lg text-[#6C757D] space-y-3 list-decimal list-inside">
          <li>Kumpulkan 5-6 benda di atas meja (contoh: pensil, penghapus, pena, buku, apel)</li>
          <li>Tanya anak: "Mana yang TIDAK sama dengan yang lain?"</li>
          <li>Minta mereka menjelaskan ALASAN pilihannya ("Apel karena bukan alat tulis!")</li>
          <li>Terima MULTIPLE jawaban yang valid - ini melatih berpikir kritis!</li>
          <li>Ganti kombinasi benda untuk ronde berikutnya</li>
        </ol>
      </div>

      <div className="bg-[#FFD166] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">💡 Tips untuk Fasilitator</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Tidak ada jawaban SALAH selama alasannya masuk akal</li>
          <li>Dorong diskusi: "Siapa punya jawaban berbeda?"</li>
          <li>Variasi: gunakan gambar, kartu, atau kategori berbeda (warna, ukuran, fungsi)</li>
        </ul>
      </div>
    </div>
  );
};

export default OddOneOutRealLife;
