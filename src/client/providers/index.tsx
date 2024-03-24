import { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from './theme-provider'
import { ThemeProviderProps } from './theme-provider/types'
import { DesignSystemProviderProps } from './design-system-provider/types'
import { DesignSystemProvider } from './design-system-provider'
import { AuthUserProvider } from './auth-user-provider'

export {
  ProfileSettingsProvider,
  useUserProfileStore,
} from './profile-settings-provider'

export {
  BackendAddressProvider,
  useBackendAddressStore,
} from './backend-address-provider'

interface ProviderProps {
  themeProps: ThemeProviderProps | undefined
  designSystemProps?: DesignSystemProviderProps | undefined
}

const Providers: FC<PropsWithChildren<ProviderProps>> = ({
  children,
  themeProps,
  designSystemProps,
}) => {
  return (
    <ThemeProvider {...themeProps}>
      <MaybeDesignSistem {...designSystemProps}>
        <AuthUserProvider>{children}</AuthUserProvider>
      </MaybeDesignSistem>
    </ThemeProvider>
  )
}

export default Providers

interface IWithDesignSystem {
  designSystemProps?: DesignSystemProviderProps | undefined
}

const MaybeDesignSistem: FC<PropsWithChildren<IWithDesignSystem>> = ({
  children,
  designSystemProps,
}) => {
  return (
    <>
      {designSystemProps ? (
        <DesignSystemProvider {...designSystemProps}>
          {children}
        </DesignSystemProvider>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
