import React, { useState, useEffect } from 'react';

const egyptGovs = [
  'Cairo', 'Giza', 'Alexandria', 'Dakahlia', 'Red Sea', 'Beheira', 'Fayoum', 'Gharbiya', 'Ismailia', 'Menofia', 'Minya', 'Qaliubiya', 'New Valley', 'Suez', 'Aswan', 'Assiut', 'Beni Suef', 'Port Said', 'Damietta', 'Sharkia', 'South Sinai', 'Kafr Al sheikh', 'Matrouh', 'Luxor', 'Qena', 'North Sinai', 'Sohag'
];

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  gov: '',
  projectType: '',
  area: '',
  message: '',
};

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  address: string;
  gov: string;
  projectType: string;
  area: string;
  message: string;
}

export function InputField({ label, name, type = 'text', value, onChange, required = true }: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="relative z-0 w-full group ">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="block py-3 px-4 w-full text-base text-[#0C1C2D] bg-transparent border-0 border-b-2 border-[#e0e7ef] focus:outline-none focus:border-[#FFA726] peer placeholder:text-gray-400"
        placeholder=" "
        required={required}
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#FFA726] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
}

export function SelectField({ label, name, value, onChange, options, required = true }: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div className="relative z-0 w-full group">
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="block py-3 pr-12 pl-4 w-full text-base text-[#0C1C2D] bg-transparent border border-[#e0e7ef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA726] focus:border-[#FFA726] transition-all duration-200 appearance-none cursor-pointer placeholder:text-gray-400"
        required={required}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TextAreaField({ label, name, value, onChange, required = true }: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="relative z-0 w-full group mt-2">
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="block py-3 px-4 w-full text-base text-[#0C1C2D] bg-transparent border-0 border-b-2 border-[#e0e7ef] focus:outline-none focus:border-[#FFA726] peer resize-none placeholder:text-gray-400"
        placeholder=" "
        required={required}
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#FFA726] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
}

const projectTypes = ["Kitchen", "Wardrobe", "Other"];

const RequestDesignForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev: FormDataState) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData(initialState);
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e0e7ef] rounded-xl p-8 sm:p-12 space-y-6 border border-[#FFA726] lg:mt-28 lg:mb-14 sm:my-20 mt-20 md:mt-24 md:mb-10 shadow-none"
      autoComplete="off"
    >
      <h2 className="text-2xl font-bold text-center text-[#0C1C2D] mb-2">Request 3D Design</h2>
      <p className="text-center text-gray-500 mb-6">Fill the form and our team will contact you for your custom 3D kitchen design.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <InputField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
        <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />
      </div>
      <SelectField label="Select Governorate" name="gov" value={formData.gov} onChange={handleChange} options={egyptGovs} />
      <div className="grid md:grid-cols-2 gap-4">
        <SelectField label="Select Project Type" name="projectType" value={formData.projectType} onChange={handleChange} options={projectTypes} />
        <InputField label="Area (m²)" name="area" value={formData.area} onChange={handleChange} />
      </div>
      <TextAreaField label="Describe your vision or requirements" name="message" value={formData.message} onChange={handleChange} />
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      {success && <div className="text-green-600 text-sm text-center">Request sent successfully! We will contact you soon.</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#FFA726] text-white font-semibold py-3 rounded-lg hover:bg-[#ff9800] transition disabled:opacity-60 mt-6"
      >
        {loading ? 'Sending...' : 'Send Request'}
      </button>
    </form>
  );
};

export default RequestDesignForm;
