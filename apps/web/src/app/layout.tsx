'use client'

import { ConfigurationProvider } from '../core/configuration'
import { CoreStoreProvider } from '../core/store'
import { DesignSystem, MrbHtml, MrbMain } from '../designSystem'
import { MichelangeloProvider } from '../libraries/michelangelo'
import { AuthenticationProvider } from '../modules/authentication'
import { GoogleOauth } from '../modules/googleOauth'
import { ReactNode } from 'react'
import { SocketProvider } from '../core/socket'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MrbHtml>
        <DesignSystem.Provider>
          <ConfigurationProvider>
            <GoogleOauth.Provider>
              <CoreStoreProvider>
                <AuthenticationProvider>
                  <SocketProvider>
                    <MichelangeloProvider>
                      <MrbMain name="Rentlink">{children}</MrbMain>
                    </MichelangeloProvider>
                  </SocketProvider>
                </AuthenticationProvider>
              </CoreStoreProvider>
            </GoogleOauth.Provider>
          </ConfigurationProvider>
        </DesignSystem.Provider>
      </MrbHtml>
    </>
  )
}
