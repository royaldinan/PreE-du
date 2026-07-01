import React from 'react';
import RealLifeCard from '../components/RealLifeCard';
import RealLifeList from '../components/RealLifeList';

const PrototypeRealLife = () => {
  return (
    <div className="space-y-6">
      <RealLifeCard icon="🎯" title="Tujuan Aktivitas" index={0}>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar membuat prototipe sederhana untuk menguji solusi mereka terhadap masalah nyata.</p>
      </RealLifeCard>

      <RealLifeCard icon="📦" title="Bahan yang Dibutuhkan" index={1}>
        <RealLifeList>
          <li>Bahan daur ulang: kardus, botol plastik, kertas, sedotan</li>
          <li>Lakban, lem, gunting</li>
          <li>Pensil warna/spidol untuk dekorasi</li>
          <li>Tali, karet gelang, kancing (bahan tambahan)</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="📝" title="Langkah-langkah" index={2}>
        <RealLifeList ordered>
          <li>Pilih MASALAH NYATA dari sesi ideation sebelumnya</li>
          <li>Minta anak memilih SATU ide untuk dibuat prototipenya</li>
          <li>Beri waktu 10-15 menit untuk membuat dengan bahan tersedia</li>
          <li>Ingatkan: tidak perlu sempurna, yang penting bisa DITES!</li>
          <li>Setiap anak/kelompok presentasi prototipe dan cara kerjanya</li>
          <li>Tes bersama: apakah solusinya bekerja? Apa yang perlu diperbaiki?</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="💡" title="Tips untuk Fasilitator" tone="placeholder" index={3}>
        <RealLifeList>
          <li>Fokus pada PROSES, bukan hasil akhir yang cantik</li>
          <li>Dorong iterasi: "Apa yang bisa ditambah/diperbaiki?"</li>
          <li>Jangan terlalu banyak membantu - biarkan mereka problem-solve sendiri</li>
          <li>Rayakan KEGAGALAN sebagai bagian belajar: "Wah, ternyata begini tidak berhasil. Kenapa ya?"</li>
        </RealLifeList>
      </RealLifeCard>
    </div>
  );
};

export default PrototypeRealLife;
