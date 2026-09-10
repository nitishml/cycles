import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        "id": "/",
        "scope": "/",
        "start_url": "/",
        "name": "Cycles",
        "short_name": "Cycles",
        "description": "Task scheduling and management system by Nitish tesst to check the change",
        "theme_color": "#022222",
        "background_color": "#022222",
        "display": "standalone",
        "orientation": "any",
        "dir": "ltr",
        "lang": "en",
        "related_applications": [],
        "prefer_related_applications": false,
        "display_override": [
            "window-controls-overlay"
        ],
        "launch_handler": {
            "client_mode": "focus-existing"
        },
        "icons": [
            {
                "src": "/pwa/icon-192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": "/pwa/icon-512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": "/pwa/icon-512-maskable.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            }
        ],
        "shortcuts": [
            {
                "name": "Cycles",
                "url": "/cycles",
                "description": "Progress for Tasks",
                "icons": [
                    {
                        "src": "/pwa/icons/cycles.png",
                        "sizes": "96x96",
                        "type": "image/png",
                        "purpose": "any"
                    }
                ]
            },
            {
                "name": "Calendar",
                "url": "/calendar",
                "description": "Personal Calendar",
                "icons": [
                    {
                        "src": "/pwa/icons/calendar-days.png",
                        "sizes": "96x96",
                        "type": "image/png",
                        "purpose": "any"
                    }
                ]
            },
            {
                "name": "Tasks",
                "url": "/tasks",
                "description": "Student Information System",
                "icons": [
                    {
                        "src": "/pwa/icons/info.png",
                        "sizes": "96x96",
                        "type": "image/png",
                        "purpose": "any"
                    }
                ]
            }
        ],
        "screenshots": [
            {
                "src": "/pwa/screenshots/mobile.png",
                "sizes": "380x670",
                "type": "image/png"
            },
            {
                "src": "/pwa/screenshots/desktop.png",
                "sizes": "1900x905",
                "type": "image/png",
                "form_factor": "wide"
            }
        ]
    }
}