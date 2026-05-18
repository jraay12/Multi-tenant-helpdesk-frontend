import { Search } from 'lucide-react'

type SearchProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

const SearchComponent = ({placeholder, onChange, value}: SearchProps) => {
  return (
    <div className='w-full h-10 relative rounded-md border border-gray-400 flex items-center'>
      <Search className='absolute left-2 text-gray-400 '/>
      <input type="text" name="search" id="search" placeholder={placeholder} className='w-full pl-10 h-full outline-none ' value={value} onChange={(e) => onChange(e.target.value)}/>
    </div>
  )
}

export default SearchComponent