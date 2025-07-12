'use client';

import dynamic from 'next/dynamic';

const RequestDesignForm = dynamic(() => import('@/components/request-design/RequestDesignForm'), { ssr: false });

export default function RequestDesignPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e0e7ef] px-4 py-12">
      <RequestDesignForm />
    </div>
  );
}
