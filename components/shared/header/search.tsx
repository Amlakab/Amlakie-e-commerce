'use client';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { APP_NAME } from '@/lib/constants';
import { motion } from 'framer-motion';

const categories = ['men', 'women', 'kids', 'accessories'];

const fadeIn = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeInOut' },
};

const hoverEffect = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.3 },
};

export default function Search() {
  return (
    <motion.form
      action="/search"
      method="GET"
      className="flex items-stretch h-9"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      {/* Select Component for Category */}
      <motion.div {...hoverEffect}>
        <Select name="category">
          <SelectTrigger className="w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r rounded-r-none rounded-l-md">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all">All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Input Component for Search */}
      <motion.div {...hoverEffect} className="flex-1">
        <Input
          className="flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full"
          placeholder={`Search ${APP_NAME}`}
          name="q"
          type="search"
        />
      </motion.div>

      {/* Submit Button with Icon */}
      <motion.button
        type="submit"
        className="bg-primary text-primary-foreground rounded-s-none rounded-e-md h-full px-3 py-2"
        {...hoverEffect}
      >
        <SearchIcon className="w-6 h-6" />
      </motion.button>
    </motion.form>
  );
}
