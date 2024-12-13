import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';

const Select = ({ selectedType, setSelectedType }) => {
    const types = ["Grass", "Poison", "Fire", "Bug", "Normal", "Water"]
    
    return (
        <div className="relative mt-2">
        <div className="flex align:left">            
            <Listbox value={selectedType} onChange={setSelectedType}>
            <div className="w-full">
            <ListboxButton className="grid w-80 cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">            
                    <span className="block truncate">{selectedType || 'Select Type'}</span>
                </span>
                <ChevronUpDownIcon
                    aria-hidden="true"
                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
            </ListboxButton>
            <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-56 w-80 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
                {types.map((type, index) => (
                    <ListboxOption
                    key={index}
                    value={type}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                    >
                        <div className="flex items-center">
                            <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                            {type}
                            </span>
                        </div>              
                    </ListboxOption>
                ))}
            </ListboxOptions>
            </div>
            </Listbox>
        </div>
        </div>
    )
}
export default Select;