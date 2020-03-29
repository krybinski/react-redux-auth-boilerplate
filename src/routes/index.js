const authRoutes = {
  home: '/',
  login: '/login',
  register: '/register',
};

const panelRoutes = {
  dashboard: '/panel/dashboard',
  profile: '/panel/profile',
};

export default { ...authRoutes, ...panelRoutes };
