import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="app-shell relative min-h-screen bg-gradient-to-r from-[#ffe0eb] via-[#fff1df] to-[#fff8ef] text-midnight">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[26rem] h-[26rem] bg-pink-200/50 blur-[160px] -top-16 -left-12" />
        <div className="absolute w-[32rem] h-[32rem] bg-amber-100/50 blur-[200px] -bottom-24 right-0" />
      </div>
      <Navbar />
      <main className="relative z-10 pb-16">{children}</main>
    </div>
  );
};

export default Layout;


