import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Share } from 'lucide-react';
import Button from '../ui/Button';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  // Detect iOS device
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = 'standalone' in (navigator as any) && (navigator as any).standalone;
    
    setIsIOSDevice(isIOS);
    setIsInstalled(isInStandaloneMode);
  }, []);

  // Listen for beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      e.preventDefault();
      setDeferredPrompt(event);
      
      // Show banner after a delay if not installed
      if (!isInstalled) {
        setTimeout(() => setShowBanner(true), 3000);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  // Check if app is already installed
  useEffect(() => {
    if ('getInstalledRelatedApps' in navigator) {
      (navigator as any).getInstalledRelatedApps().then((relatedApps: any[]) => {
        if (relatedApps.length > 0) {
          setIsInstalled(true);
        }
      });
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOSDevice) {
        setShowIOSInstructions(true);
        return;
      }
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        // Haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate(10);
        }
      }
      
      setDeferredPrompt(null);
      setShowBanner(false);
    } catch (error) {
      console.error('Install prompt error:', error);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Check if user has dismissed the banner recently
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) { // Don't show for a week
        setShowBanner(false);
        return;
      }
    }
  }, []);

  // Don't show if already installed or no prompt available
  if (isInstalled || (!deferredPrompt && !isIOSDevice) || !showBanner) {
    return null;
  }

  return (
    <>
      {/* Main Install Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 left-4 right-4 z-40 bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-4 safe-area-inset-bottom"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Install Heart Clinic Melbourne
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Add to your home screen for quick access to appointments, telehealth, and cardiac care information.
                </p>
              </div>
              
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            <div className="mt-3 flex space-x-2">
              <motion.button
                onClick={handleInstallClick}
                className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                <span>Install App</span>
              </motion.button>
              
              <motion.button
                onClick={handleDismiss}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Later
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Instructions Modal */}
      <AnimatePresence>
        {showIOSInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowIOSInstructions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Install on iPhone
                </h3>
                
                <div className="text-left space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">1</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Tap the <Share className="w-4 h-4 inline mx-1" /> share button at the bottom of Safari
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">2</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Scroll down and tap "Add to Home Screen"
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">3</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Tap "Add" to install the app
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => setShowIOSInstructions(false)}
                  className="w-full"
                >
                  Got it
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PWAInstallBanner;