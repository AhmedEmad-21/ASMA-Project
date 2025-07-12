import React, { useState, useCallback, useMemo } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
}

interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    gov: string;
    message: string;
    units: Product[];
}

interface ContactFormProps {
    selectedUnits: Product[];
    onRemoveUnit: (id: number) => void;
    onSubmit: (data: ContactFormData) => void;
    onBack: () => void;
    egyptGovs?: string[];
}

const initialState: Omit<ContactFormData, 'units'> = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gov: '',
    message: '',
};

const ContactForm: React.FC<ContactFormProps> = React.memo(
  ({ selectedUnits = [], onRemoveUnit, onSubmit, onBack, egyptGovs = [] }) => {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Memoize unitsList for performance
    const unitsList = useMemo(() => (
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Selected Units</label>
        {selectedUnits.length === 0 ? (
          <div className="text-gray-400 text-sm">No units selected.</div>
        ) : (
          <ul className="divide-y divide-gray-200 bg-gray-50 rounded-lg border border-gray-200">
            {selectedUnits.map(unit => (
              <li key={unit.id} className="flex items-center justify-between px-3 py-2">
                <span className="font-medium text-gray-700 text-sm">{unit.name}</span>
                <button type="button" onClick={() => onRemoveUnit(unit.id)} className="text-red-500 text-xs hover:underline">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    ), [selectedUnits, onRemoveUnit]);

    // Memoize isSubmitDisabled for performance
    const isSubmitDisabled = useMemo(
      () => loading || selectedUnits.length === 0 || !formData.gov,
      [loading, selectedUnits.length, formData.gov]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
      },
      []
    );

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        if (selectedUnits.length === 0) {
          setError('Please select at least one unit.');
          setLoading(false);
          return;
        }
        try {
          await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, units: selectedUnits }),
          });
          setSuccess(true);
          setFormData(initialState);
          onSubmit({ ...formData, units: selectedUnits });
        } catch {
          setError('Something went wrong. Please try again.');
        } finally {
          setLoading(false);
        }
      },
      [formData, selectedUnits, onSubmit]
    );

    return (
      <LazyMotion features={domAnimation}>
        <m.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg mx-auto px-2 sm:px-0 bg-transparent border border-[#FFA726] rounded-xl p-8 sm:p-12 lg:px-10 lg:py-8"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className="block py-3 px-4 w-full text-base sm:text-lg text-[#0C1C2D] bg-transparent border-0 border-b-2 border-[#e0e7ef] appearance-none focus:outline-none focus:ring-0 focus:border-[#FFA726] peer placeholder:text-gray-400" placeholder=" " required />
              <label htmlFor="firstName" className="peer-focus:font-medium absolute text-base sm:text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#FFA726] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className="block py-3 px-4 w-full text-base sm:text-lg text-[#0C1C2D] bg-transparent border-0 border-b-2 border-[#e0e7ef] appearance-none focus:outline-none focus:ring-0 focus:border-[#FFA726] peer placeholder:text-gray-400" placeholder=" " required />
              <label htmlFor="lastName" className="peer-focus:font-medium absolute text-base sm:text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#FFA726] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="block py-3 px-4 w-full text-base sm:text-lg text-[#0C1C2D] bg-transparent border-0 border-b-2 border-[#e0e7ef] appearance-none focus:outline-none focus:ring-0 focus:border-[#FFA726] peer placeholder:text-gray-400" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-base sm:text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#FFA726] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="block py-3 px-4 w-full text-base sm:text-lg text-[#0C1C2D] bg-transparent border-0 border-b-2 border-[#e0e7ef] appearance-none focus:outline-none focus:ring-0 focus:border-[#FFA726] peer placeholder:text-gray-400" placeholder=" " required />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-base sm:text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#FFA726] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="block py-3 px-4 w-full text-base sm:text-lg text-[#0C1C2D] bg-transparent border-0 border-b-2 border-[#e0e7ef] appearance-none focus:outline-none focus:ring-0 focus:border-[#FFA726] peer placeholder:text-gray-400" placeholder=" " required />
            <label htmlFor="address" className="peer-focus:font-medium absolute text-base sm:text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#FFA726] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <div className="relative">
              <select
                name="gov"
                id="gov"
                value={formData.gov}
                onChange={handleChange}
                className="block py-3 pr-12 pl-4 w-full text-base sm:text-lg text-[#0C1C2D] bg-transparent border border-[#e0e7ef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA726] focus:border-[#FFA726] transition-all duration-200 appearance-none cursor-pointer placeholder:text-gray-400"
                required
                style={{ maxHeight: '220px', overflowY: 'auto', background: 'transparent' }}
              >
                <option value="" disabled>Select Governorate</option>
                {egyptGovs.map((gov) => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
              {/* أيقونة السهم */}
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows={4} className="block py-3 px-4 w-full text-base sm:text-lg text-[#0C1C2D] bg-transparent border-0 border-b-2 border-[#e0e7ef] appearance-none focus:outline-none focus:ring-0 focus:border-[#FFA726] peer resize-none placeholder:text-gray-400" placeholder=" " required />
            <label htmlFor="message" className="peer-focus:font-medium absolute text-base sm:text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#FFA726] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Message</label>
          </div>
          {unitsList}
          {error && <div className="text-red-600 text-sm mb-3 text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-3 text-center">Message sent successfully!</div>}
          <div className="flex gap-4 justify-between items-center mt-6">
            <button type="button" onClick={onBack} className="text-gray-600 border border-gray-300 rounded-lg px-5 py-2.5 text-base sm:text-lg font-medium hover:bg-gray-100 transition">Back</button>
            <button type="submit" disabled={isSubmitDisabled} className="text-white bg-[#FFA726] hover:bg-[#ff9800] focus:ring-4 focus:outline-none focus:ring-[#FFA726] font-medium rounded-lg text-base sm:text-lg w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-90 transition">{loading ? 'Sending...' : 'Submit'}</button>
          </div>
        </m.form>
      </LazyMotion>
    );
  }
);

ContactForm.displayName = 'ContactForm';

export default ContactForm;