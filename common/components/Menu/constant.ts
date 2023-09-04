import { Path } from 'common/enums/path'

export const MenuItems = [
  {
    name: 'Profile Settings',
    href: Path.PROFILE_SETTINGS,
    icon: '/img/icons/settings.svg',
    selectIcon: '/img/icons/settings-outline.svg',
  },
  {
    name: 'Statistics',
    href: '/',
    icon: '/img/icons/trending-up.svg',
    selectIcon: '/img/icons/trending-up_selected.svg',
  },
  {
    name: 'Favorites',
    href: '/',
    icon: '/img/icons/favorites.svg',
    selectIcon: '/img/icons/favorites_selected.svg',
  },

  {
    name: 'Log Out',
    href: '',
    icon: '/img/icons/log-out.svg',
    selectIcon: '/img/icons/log-out.svg',
  },
]
