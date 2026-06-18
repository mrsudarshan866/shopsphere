const Footer = () => {
  return (
    <footer className="border-t mt-20">
      <div className="container mx-auto px-4 py-10">
        <p className="text-center text-gray-500">
          © {new Date().getFullYear()} ShopSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
