import React from 'react';
import RealLifeCard from '../components/RealLifeCard';
import RealLifeList from '../components/RealLifeList';

const SortingRealLife = () => {
  return (
    <div className="space-y-6">
      <RealLifeCard icon="🎯" title="Tujuan Aktivitas" index={0}>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar mengurutkan benda dari yang terkecil hingga terbesar (atau sebaliknya) seperti mengurutkan angka.</p>
      </RealLifeCard>

      <RealLifeCard icon="📦" title="Bahan yang Dibutuhkan" index={1}>
        <RealLifeList>
          <li>Kertas atau karton bekas</li>
          <li>Pulpen atau spidol</li>
          <li>Gunting (optional)</li>
          <li>Benda-benda di sekitar (buku, pensil, mainan)</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="📝" title="Langkah-langkah" index={2}>
        <RealLifeList ordered>
          <li>Tulis angka 1-20 di kertas terpisah (atau gunakan benda langsung)</li>
          <li>Acak semua kertas/benda di lantai atau meja</li>
          <li>Minta anak mengurutkan dari yang TERKECIL ke TERBESAR</li>
          <li>Bisa juga variasi: urutkan berdasarkan panjang kata, jumlah huruf nama, atau ukuran benda</li>
          <li>Beri pujian setiap kali mereka berhasil mengurutkan dengan benar!</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="💡" title="Tips untuk Fasilitator" tone="placeholder" index={3}>
        <RealLifeList>
          <li>Mulai dengan angka sedikit (5-10) untuk anak yang lebih kecil</li>
          <li>Jadikan kompetisi seru: "Siapa paling cepat?"</li>
          <li>Gunakan benda nyata agar lebih konkret dan fun</li>
        </RealLifeList>
      </RealLifeCard>
    </div>
  );
};

export default SortingRealLife;
