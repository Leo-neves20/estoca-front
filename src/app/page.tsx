'use client';
import { CustomInputBase } from '@/components';

export default function Home() {
  return (
    <>
      <CustomInputBase
        label="Nome do campo"
        width={300}
        isError
        errorMessage="Mensagem de erro"
        placeholder="Digete um placeholder"
      />
    </>
  );
}
