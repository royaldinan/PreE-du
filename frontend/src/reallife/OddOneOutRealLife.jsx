import React from 'react';
import RealLifeCard from '../components/RealLifeCard';
import RealLifeList from '../components/RealLifeList';

const OddOneOutRealLife = () => {
  return (
    <div className="space-y-6">
      <RealLifeCard icon="🎯" title="Tujuan Aktivitas" index={0}>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar mengidentifikasi benda yang berbeda dan menjelaskan alasan logis di balik pilihan mereka.</p>
      </RealLifeCard>

      <RealLifeCard icon="📦" title="Bahan yang Dibutuhkan" index={1}>
        <RealLifeList>
          <li>Benda-benda di sekitar kelas/ruangan (pensil, penghapus, buku, apel, mainan, dll)</li>
          <li>Meja atau lantai sebagai area permainan</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="📝" title="Langkah-langkah" index={2}>
        <RealLifeList ordered>
          <li>Kumpulkan 5-6 benda di atas meja (contoh: pensil, penghapus, pena, buku, apel)</li>
          <li>Tanya anak: "Mana yang TIDAK sama dengan yang lain?"</li>
          <li>Minta mereka menjelaskan ALASAN pilihannya ("Apel karena bukan alat tulis!")</li>
          <li>Terima MULTIPLE jawaban yang valid - ini melatih berpikir kritis!</li>
          <li>Ganti kombinasi benda untuk ronde berikutnya</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="💡" title="Tips untuk Fasilitator" tone="placeholder" index={3}>
        <RealLifeList>
          <li>Tidak ada jawaban SALAH selama alasannya masuk akal</li>
          <li>Dorong diskusi: "Siapa punya jawaban berbeda?"</li>
          <li>Variasi: gunakan gambar, kartu, atau kategori berbeda (warna, ukuran, fungsi)</li>
        </RealLifeList>
      </RealLifeCard>
    </div>
  );
};

export default OddOneOutRealLife;
