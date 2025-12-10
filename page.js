'use client';
import { useState, useEffect } from 'react';
import BioEditor from '@/components/BioEditor';
import LivePreview from '@/components/LivePreview';
import ColorPicker from '@/components/ColorPicker';
import FormattingTools from '@/components/FormattingTools';
import Examples from '@/components/Examples';
import AuthModal from '@/components/AuthModal';
import { parseBio, validateBio, getSuggestedBios } from '@/lib/bioParser';
import { toast, Toaster } from 'react-hot-toast';
import { Copy, Download, Palette, Zap, Shield, Sparkles, TrendingUp, Users, Star } from 'lucide-react';

export default function Home() {
  const [bioText, setBioText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const lines = bioText.split('\n').length;
    setCharCount(bioText.length);
    setLineCount(lines);
  }, [bioText]);

  const handleInsertExample = (example) => {
    setBioText(example);
    toast.success('Example loaded! Edit as needed.');
  };

  const handleCopyBio = async () => {
    try {
      await navigator.clipboard.writeText(bioText);
      toast.success('Bio copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleSaveBio = () => {
    const validation = validateBio(bioText);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }
    setShowAuthModal(true);
  };

  const clearBio = () => {
    setBioText('');
    toast.success('Editor cleared!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Toaster position="top-right" />
      
      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-red-500 p-2 rounded-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Free Fire Bio Maker
                </span>
              </h1>
            </div>
            
            <div className="flex space-x-4">
              <a href="#features" className="hover:text-orange-400 transition">Features</a>
              <a href="#how-to" className="hover:text-orange-400 transition">How To</a>
              <a href="#examples" className="hover:text-orange-400 transition">Examples</a>
              <button className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition">
                Get Premium
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Create <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">Stunning</span> Free Fire Bios
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Design colorful, formatted bios for your Free Fire profile. No login required • 100% Free • Mobile Friendly
        </p>
        
        <div className="flex justify-center space-x-4 mb-12">
          <div className="bg-gray-800/50 p-4 rounded-xl">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="font-bold">40+ Colors</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="font-bold">Live Preview</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl">
            <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="font-bold">Secure</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="font-bold">10K+ Users</p>
          </div>
        </div>
      </section>

      {/* Main Editor Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Editor */}
          <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Palette className="mr-2 text-orange-400" /> Bio Editor
              </h2>
              <div className="text-sm bg-gray-800 px-3 py-1 rounded-full">
                <span className={charCount > 240 ? 'text-red-400' : 'text-green-400'}>
                  {charCount}/250
                </span>
                <span className="mx-2">•</span>
                <span className={lineCount > 2 ? 'text-red-400' : 'text-green-400'}>
                  {lineCount}/3 lines
                </span>
              </div>
            </div>

            <textarea
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              placeholder={`[FF0000]🔥 PRO PLAYER\n[FFFFFF]Rank: Heroic\n[00FF00]Daily Active\n\nUse tags:\n[FF0000] for Red\n[00FF00] for Green\n[b]Bold Text[/b]\n[i]Italic Text[/i]`}
              className="w-full h-64 bg-gray-950 border border-gray-700 rounded-xl p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              maxLength={250}
            />

            <div className="mt-6">
              <ColorPicker selectedColor={selectedColor} onSelect={setSelectedColor} />
              <FormattingTools onInsert={handleInsertExample} />
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={handleCopyBio}
                className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-lg flex items-center justify-center font-semibold transition"
              >
                <Copy className="mr-2" /> Copy Bio
              </button>
              <button
                onClick={clearBio}
                className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-lg font-semibold transition"
              >
                Clear
              </button>
              <button
                onClick={handleSaveBio}
                className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 py-3 rounded-lg flex items-center justify-center font-semibold transition"
              >
                <Download className="mr-2" /> Update in Free Fire
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center">
                <Shield className="mr-2 text-blue-400" /> Formatting Rules
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Use <code className="bg-gray-700 px-1 rounded">[FF0000]</code> for color codes</li>
                <li>• <code className="bg-gray-700 px-1 rounded">[b]Bold[/b]</code> <code className="bg-gray-700 px-1 rounded">[i]Italic[/i]</code></li>
                <li>• Maximum 3 lines and 250 characters</li>
                <li>• Press Enter for new line</li>
              </ul>
            </div>
          </div>

          {/* Right - Preview */}
          <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 shadow-2xl">
            <LivePreview bioText={bioText} />
            
            <div className="mt-8">
              <Examples onSelectExample={handleInsertExample} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          <Star className="inline mr-2 text-yellow-400" /> Why Choose Our Bio Maker?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🎨', title: '40+ Colors', desc: 'Vibrant color palette with hex codes' },
            { icon: '⚡', title: 'Instant Preview', desc: 'See changes in real-time' },
            { icon: '🔒', title: '100% Safe', desc: 'No password storage' },
            { icon: '📱', title: 'Mobile Optimized', desc: 'Works on all devices' },
            { icon: '🔄', title: 'Auto Save', desc: 'Draft auto-saves locally' },
            { icon: '🎯', title: 'Pre-made Templates', desc: '50+ ready-to-use bios' }
          ].map((feature, idx) => (
            <div key={idx} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-orange-500 transition">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How To Use */}
      <section id="how-to" className="container mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">How To Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Write Bio', desc: 'Type your bio or use templates' },
              { step: '2', title: 'Add Formatting', desc: 'Use colors, bold, italic tags' },
              { step: '3', title: 'Preview', desc: 'Check how it looks in-game' },
              { step: '4', title: 'Update', desc: 'Copy or update in Free Fire' }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            © 2024 Free Fire Bio Maker. This is a fan-made tool. Not affiliated with Garena.
          </p>
          <p className="text-sm text-gray-500">
            Made with ❤️ for Free Fire community | 
            <a href="#" className="ml-2 hover:text-orange-400">Privacy Policy</a> • 
            <a href="#" className="mx-2 hover:text-orange-400">Terms</a> • 
            <a href="#" className="hover:text-orange-400">Contact</a>
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal bioText={bioText} onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}