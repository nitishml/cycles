// components/InstallPWA.tsx
'use client'

import { Download } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '../ui/button'

export function InstallPWAButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [isInstallable, setIsInstallable] = useState(false)

    useEffect(() => {
        // Store the install prompt event for later use
        const handleBeforeInstallPrompt = (e: Event) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault()
            // Store the event for later use
            setDeferredPrompt(e)
            // Show the install button
            setIsInstallable(true)
        }

        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

        // Listen for successful install
        window.addEventListener('appinstalled', () => {
            setIsInstallable(false)
            console.log('EMS-PWA was installed')
        })

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        }
    }, [])

    const handleInstallClick = () => {
        if (!deferredPrompt) return

        // Show the install prompt
        deferredPrompt.prompt()

        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt')
            } else {
                console.log('User dismissed the install prompt')
            }
            // We no longer need the prompt, clear it
            setDeferredPrompt(null)
        })
    }

    // if (!isInstallable) return null

    return (
        <>
            <Button
                onClick={handleInstallClick}
                className=""
                size={'icon'}
                variant={'outline'}
            >
                <Download />
            </Button>
        </>
    )
}

export function InstallPWADropdownButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [isInstallable, setIsInstallable] = useState(false)

    useEffect(() => {
        // Store the install prompt event for later use
        const handleBeforeInstallPrompt = (e: Event) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault()
            // Store the event for later use
            setDeferredPrompt(e)
            // Show the install button
            setIsInstallable(true)
        }

        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

        // Listen for successful install
        window.addEventListener('appinstalled', () => {
            setIsInstallable(false)
            console.log('EMS-PWA was installed')
        })

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        }
    }, [])

    const handleInstallClick = () => {
        if (!deferredPrompt) return

        // Show the install prompt
        deferredPrompt.prompt()

        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt')
            } else {
                console.log('User dismissed the install prompt')
            }
            // We no longer need the prompt, clear it
            setDeferredPrompt(null)
        })
    }

    // if (!isInstallable) return null

    return (
        <>
            <Button
                onClick={handleInstallClick}
                className=""
                // size={''}
                variant={'outline'}
            >
                <Download />
                Install App
            </Button>
        </>
    )
}

export function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    if (!deferredPrompt) return null;

    return (
        <button
            onClick={async () => {
                deferredPrompt.prompt();
                await deferredPrompt.userChoice;
                setDeferredPrompt(null);
            }}
        >
            Install App
        </button>
    );
}