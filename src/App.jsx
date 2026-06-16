import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Menu, 
  X, 
  ArrowUpRight, 
  Shield, 
  Layers, 
  Sparkles, 
  Briefcase, 
  Calculator, 
  Phone, 
  Check,
  Send,
  ExternalLink,
  Flame,
  Star
} from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Calculator State
  const [calcService, setCalcService] = useState('laser');
  const [calcQuantity, setCalcQuantity] = useState(25);
  const [calcDelivery, setCalcDelivery] = useState('standard');
  const [calcResult, setCalcResult] = useState({ unitPrice: 0, total: 0, savings: 0 });

  // Contact form state
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update calculator whenever inputs change
  useEffect(() => {
    let basePrice = 35; // default laser
    if (calcService === 'leather') basePrice = 45;
    if (calcService === 'embroidery') basePrice = 69;
    if (calcService === 'stationery') basePrice = 5;

    let totalRaw = basePrice * calcQuantity;
    let discountPercent = 0;
    
    if (calcQuantity >= 10 && calcQuantity < 50) {
      discountPercent = 0.15; // 15% discount for 10-49 units
    } else if (calcQuantity >= 50) {
      discountPercent = 0.30; // 30% discount for 50+ units
    }

    let savings = totalRaw * discountPercent;
    let totalAfterDiscount = totalRaw - savings;

    // Apply delivery fee
    if (calcDelivery === 'express') {
      totalAfterDiscount += 45; // Express Luxembourg delivery
    }

    const unitPrice = totalAfterDiscount / calcQuantity;

    setCalcResult({
      unitPrice: Math.round(unitPrice * 100) / 100,
      total: Math.round(totalAfterDiscount),
      savings: Math.round(savings)
    });
  }, [calcService, calcQuantity, calcDelivery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', company: '', message: '' });
    }, 4000);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37]/30">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#050505]/85 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors duration-500">
              <span className="text-[#D4AF37] font-semibold text-sm tracking-widest">AP</span>
            </div>
            <span className="font-display font-semibold tracking-[0.25em] text-xs md:text-sm uppercase text-white group-hover:text-[#D4AF37] transition-colors duration-500">
              Atelier Prestige
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'Services', link: '#services' },
              { label: 'B2B Corporate', link: '#corporate' },
              { label: 'Calculator', link: '#calculator' },
              { label: 'Contact', link: '#contact' }
            ].map((item, i) => (
              <motion.a 
                key={item.label}
                href={item.link}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-[10px] font-semibold tracking-widest text-white/70 hover:text-[#D4AF37] uppercase transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <a 
              href="#contact" 
              className="glass-button px-6 py-2.5 rounded-full text-[10px] tracking-widest font-semibold uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-500 flex items-center gap-2"
            >
              Get Bespoke Quote
              <ArrowUpRight size={13} />
            </a>
          </motion.div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#050505] p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37] font-semibold tracking-widest">AP</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-white">Atelier Prestige</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
                <X size={28} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 px-6 my-auto">
              {[
                { label: 'Bespoke Services', link: '#services' },
                { label: 'B2B Solutions', link: '#corporate' },
                { label: 'Bespoke Calculator', link: '#calculator' },
                { label: 'Contact Taller', link: '#contact' }
              ].map((item) => (
                <a 
                  key={item.label} 
                  href={item.link} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="text-3xl font-display font-light text-white/80 hover:text-[#D4AF37] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="px-6 pb-12">
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block bg-[#D4AF37] text-black py-4 rounded-full font-semibold uppercase tracking-widest text-xs"
              >
                Request Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#050505] z-10 opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/50 to-[#050505] z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)] z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel mb-8 border-white/10 bg-white/5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="text-[9px] tracking-[0.3em] font-semibold uppercase text-[#D4AF37]">
                Luxembourg's Premium Customization Studio
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl md:text-7xl lg:text-[84px] leading-[1.1] font-display font-medium tracking-tight mb-8">
              L'Art de la Personnalisation <br className="hidden md:block"/>
              <span className="text-gradient-gold italic font-light pr-4">Bespoke Excellence</span>.
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-base md:text-xl text-white/70 font-light max-w-2xl mb-12 leading-relaxed">
              Combining Swiss-level detail, Italian leather craftsmanship, and high-precision German laser engraving. We design luxury custom corporate gifts, prestige wedding favors, and bespoke apparel directly from our state-of-the-art workshop.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5">
              <a href="#calculator" className="bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:scale-[1.03] transition-all duration-300">
                Calculate Bespoke Quote
                <ChevronRight size={16} />
              </a>
              <a href="#services" className="glass-button px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2">
                Our Capabilities
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expertise / Services Section */}
      <section id="services" className="py-32 relative border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-[#D4AF37] uppercase">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium mt-3 mb-6">Four Pillars of Custom Luxury</h2>
            <p className="text-white/60 font-light leading-relaxed">
              Every item represents an uncompromised blend of high-tech precision and traditional hand-finishing. Made to leave an unforgettable impression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="glass-panel p-8 rounded-2xl border-white/5 group hover:border-[#D4AF37]/30 transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                  <Flame size={20} />
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-[#D4AF37] transition-colors">Gravure Laser</h3>
                <h4 className="text-xs text-white/40 uppercase tracking-widest mb-4">Precision Laser Engraving</h4>
                <p className="text-white/50 text-sm leading-relaxed font-light mb-6">
                  Permanent molecular engraving on premium double-wall stainless steel thermoses, architectural slate coasters, wood, and anodized aluminum.
                </p>
              </div>
              <div className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase flex items-center gap-2">
                From €35 / unit
                <ArrowUpRight size={12} />
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-panel p-8 rounded-2xl border-white/5 group hover:border-[#D4AF37]/30 transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                  <Layers size={20} />
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-[#D4AF37] transition-colors">Maroquinerie d'Élite</h3>
                <h4 className="text-xs text-white/40 uppercase tracking-widest mb-4">Bespoke Leathercraft</h4>
                <p className="text-white/50 text-sm leading-relaxed font-light mb-6">
                  Fine Italian full-grain leather cardholders, wallets, and keychains cut precisely with custom metal dies and hot-stamped with initials.
                </p>
              </div>
              <div className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase flex items-center gap-2">
                From €45 / unit
                <ArrowUpRight size={12} />
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-panel p-8 rounded-2xl border-white/5 group hover:border-[#D4AF37]/30 transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-[#D4AF37] transition-colors">Broderie Fine</h3>
                <h4 className="text-xs text-white/40 uppercase tracking-widest mb-4">Fine Organic Embroidery</h4>
                <p className="text-white/50 text-sm leading-relaxed font-light mb-6">
                  Intricate multi-thread branding stitched onto heavyweight organic cotton sweatshirts, hoodies, uniforms, and corporate caps.
                </p>
              </div>
              <div className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase flex items-center gap-2">
                From €69 / unit
                <ArrowUpRight size={12} />
              </div>
            </div>

            {/* Card 4 */}
            <div className="glass-panel p-8 rounded-2xl border-white/5 group hover:border-[#D4AF37]/30 transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                  <Star size={20} />
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-[#D4AF37] transition-colors">Papeterie Prestige</h3>
                <h4 className="text-xs text-white/40 uppercase tracking-widest mb-4">Gold Foil Stationery</h4>
                <p className="text-white/50 text-sm leading-relaxed font-light mb-6">
                  Stunning hot-foil gold and silver calligraphy on heavy-weight cotton invitations, custom business cards, and luxury brand tags.
                </p>
              </div>
              <div className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase flex items-center gap-2">
                From €5 / unit
                <ArrowUpRight size={12} />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* B2B Corporate Section */}
      <section id="corporate" className="py-32 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <span className="text-[10px] tracking-[0.3em] font-semibold text-[#D4AF37] uppercase">B2B Solutions</span>
              <h2 className="text-3xl md:text-5xl font-display font-medium mt-3 mb-8">Corporate Gifting Reimagined</h2>
              
              <p className="text-white/70 font-light leading-relaxed mb-8">
                Luxembourg's leading banks, wealth managers, and tech startups rely on Atelier Prestige to deliver onboarding packs, customized luxury tech items, and bespoke leather folders that command respect.
              </p>

              <div className="space-y-6">
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white"> trilingual Branding (FR / EN / DE)</h4>
                    <p className="text-sm text-white/50 font-light mt-1">All design reviews, mockups, and client service managed perfectly in your language.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Ultra-Fast 24h Luxembourg Express</h4>
                    <p className="text-sm text-white/50 font-light mt-1">Last-minute VIP events? We print, package, and deliver to Kirchberg, Gare, or Cloche d'Or in less than 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Sustainability & Premium Packaging</h4>
                    <p className="text-sm text-white/50 font-light mt-1">Every item packaged in organic Kraft-fiber containers, completely plastic-free and ready for client delivery.</p>
                  </div>
                </div>

              </div>

              <div className="mt-12 flex items-center gap-6">
                <a href="#contact" className="bg-[#D4AF37] text-black font-semibold px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300">
                  Request Corporate Catalog
                </a>
              </div>
            </div>

            {/* Right graphic panel representing premium corporate pack */}
            <div className="relative glass-panel p-8 md:p-12 rounded-3xl border-white/5 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.05),transparent_70%)]">
              <div className="absolute top-4 right-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] tracking-widest font-semibold uppercase px-3 py-1 rounded-full">
                Luxembourg VIP
              </div>
              <h3 className="text-2xl font-display font-semibold mb-6">Prestige Corporate Pack</h3>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Includes Custom Laser + Embroidery combo</p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-sm font-light text-white/80">30x Organic Cotton Hoodies (Gold Embroidery)</span>
                  <span className="text-sm font-semibold text-[#D4AF37]">€1,449</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-sm font-light text-white/80">30x Matte Black Thermos (Precise Engraving)</span>
                  <span className="text-sm font-semibold text-[#D4AF37]">€735</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-sm font-light text-white/80">Premium Kraft boxes + Custom ribbon branding</span>
                  <span className="text-sm font-semibold text-green-400">Included</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                <div>
                  <h5 className="text-white/40 text-[10px] uppercase tracking-widest">Total Estimated Package</h5>
                  <h4 className="text-2xl font-semibold mt-1">€2,184 <span className="text-xs text-white/40 font-light">excl. VAT</span></h4>
                </div>
                <a href="#calculator" className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] hover:text-white transition-colors flex items-center gap-2">
                  Customize This
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Pricing Calculator Section */}
      <section id="calculator" className="py-32 relative bg-[#080808] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-[#D4AF37] uppercase">Interactive Tool</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium mt-3 mb-6">Luxembourg Bespoke Pricing Calculator</h2>
            <p className="text-white/60 font-light leading-relaxed">
              Select your service, choose delivery speed, and compute your custom volume discount pricing in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Input Form Column (7 cols) */}
            <div className="lg:col-span-7 glass-panel p-8 md:p-12 rounded-3xl border-white/5 flex flex-col justify-between">
              
              <div className="space-y-8">
                
                {/* Step 1: Select Service */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4">
                    1. Choose Custom Capability
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'laser', title: 'Laser Engraved Thermos', price: '€35' },
                      { id: 'leather', title: 'Monogrammed Leathercraft', price: '€45' },
                      { id: 'embroidery', title: 'Premium Embroidered Hoodie', price: '€69' },
                      { id: 'stationery', title: 'Gold Foil Invitation', price: '€5' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setCalcService(s.id);
                          if (s.id === 'stationery' && calcQuantity < 20) {
                            setCalcQuantity(20); // enforce min qty for stationery
                          }
                        }}
                        className={`p-4 rounded-xl border text-left transition-all duration-300 ${calcService === s.id ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white' : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'}`}
                      >
                        <h4 className="font-semibold text-sm">{s.title}</h4>
                        <span className="text-xs opacity-60 mt-1 block">Base Price: {s.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Quantity with Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                      2. Quantity Required
                    </label>
                    <span className="text-lg font-semibold font-display text-white">{calcQuantity} units</span>
                  </div>
                  
                  <input
                    type="range"
                    min={calcService === 'stationery' ? 20 : 1}
                    max="150"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37] mb-2"
                  />
                  
                  <div className="flex justify-between text-[10px] text-white/40 tracking-wider">
                    <span>Min: {calcService === 'stationery' ? 20 : 1}</span>
                    <span>10+ units (15% Off)</span>
                    <span>50+ units (30% Off)</span>
                    <span>150 units max</span>
                  </div>
                </div>

                {/* Step 3: Select Delivery Speed */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4">
                    3. Delivery Speed in Luxembourg
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setCalcDelivery('standard')}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${calcDelivery === 'standard' ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white' : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'}`}
                    >
                      <h4 className="font-semibold text-sm">Standard (3-5 Days)</h4>
                      <span className="text-xs opacity-60 mt-1 block text-green-400">Free Delivery</span>
                    </button>
                    
                    <button
                      onClick={() => setCalcDelivery('express')}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${calcDelivery === 'express' ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white' : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'}`}
                    >
                      <h4 className="font-semibold text-sm">Express 24 Hours</h4>
                      <span className="text-xs opacity-60 mt-1 block text-amber-400">+€45 flat rate</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Receipt Summary Column (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#111] to-[#070707] border border-[#D4AF37]/20 p-8 md:p-12 rounded-3xl flex flex-col justify-between">
              
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-8">
                  <Calculator size={16} />
                  <span>Bespoke Estimate Receipt</span>
                </div>

                <div className="space-y-4 text-sm font-light text-white/70">
                  
                  <div className="flex justify-between">
                    <span>Base Unit Cost</span>
                    <span className="font-semibold text-white">
                      {calcService === 'laser' && '€35.00'}
                      {calcService === 'leather' && '€45.00'}
                      {calcService === 'embroidery' && '€69.00'}
                      {calcService === 'stationery' && '€5.00'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Total Quantity</span>
                    <span className="font-semibold text-white">{calcQuantity} units</span>
                  </div>

                  {calcResult.savings > 0 && (
                    <div className="flex justify-between text-green-400 font-medium">
                      <span>Volume Discount Applied</span>
                      <span>-€{calcResult.savings}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Luxembourg Delivery</span>
                    <span className="font-semibold text-white">
                      {calcDelivery === 'express' ? '€45.00 (Express 24h)' : 'Free (Standard)'}
                    </span>
                  </div>

                  <div className="border-t border-white/10 my-6 pt-6 flex justify-between items-end">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-white/40">Average Unit Price</span>
                      <h4 className="text-2xl font-semibold text-white mt-1">€{calcResult.unitPrice} <span className="text-xs font-light text-white/40">/ unit</span></h4>
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-center">
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">Total Estimate</span>
                  <span className="text-3xl font-display font-semibold text-white">€{calcResult.total}</span>
                </div>

                <a 
                  href="#contact" 
                  className="w-full text-center block bg-[#D4AF37] text-black font-semibold py-4 rounded-full hover:bg-white transition-colors duration-300"
                >
                  Order Bespoke Lote
                </a>
                <p className="text-[10px] text-white/40 text-center mt-3">
                  VAT of 17% excluded. Final prices calculated during custom project onboarding.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Bespoke Contact Form */}
      <section id="contact" className="py-32 relative border-t border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-[#D4AF37] uppercase">Contact Workshop</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium mt-3 mb-6">Start a Custom Project</h2>
            <p className="text-white/60 font-light max-w-xl mx-auto">
              Discuss your luxury requirements with our master artisan. Fill out the form or drop us an email directly.
            </p>
          </div>

          <div className="glass-panel p-8 md:p-12 rounded-3xl border-white/5">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Jean Dupont" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">Corporate Email</label>
                      <input 
                        type="email" 
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. j.dupont@bank.lu" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">Company / Event (Optional)</label>
                    <input 
                      type="text" 
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      placeholder="e.g. Luxembourg Wealth Management" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">Project Brief / Bespoke Request</label>
                    <textarea 
                      rows="4"
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe the products, colors, logos, or gold foil engraving details you require..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-white text-black font-semibold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#D4AF37] transition-colors duration-300"
                  >
                    Send Bespoke Inquiry
                    <Send size={14} />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mx-auto">
                    <Check size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold">Bespoke Inquiry Received</h3>
                  <p className="text-white/60 max-w-md mx-auto text-sm leading-relaxed">
                    Thank you! Our master artisan is currently reviewing your project details. We will contact you in French or English with digital render mockups within **2 business hours**.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#030303]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] font-semibold tracking-widest">AP</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Atelier Prestige Luxembourg</span>
          </div>
          <div className="flex gap-8 text-[10px] text-white/40 uppercase tracking-widest font-semibold">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#corporate" className="hover:text-white transition-colors">Corporate B2B</a>
            <a href="#calculator" className="hover:text-white transition-colors">Bespoke Calculator</a>
            <span className="text-white/20">Luxembourg trilingual Craftsmanship</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
