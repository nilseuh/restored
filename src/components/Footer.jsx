import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-sand-100 dark:bg-[#0f0d0a] py-8 mt-auto transition-colors duration-500"
    >
      <p className="text-center text-sm text-sand-600 dark:text-sand-600">
        &copy; {new Date().getFullYear()} Restored &mdash; Un espace de bienveillance
      </p>
    </motion.footer>
  );
}
