import { useAuthStore } from '../store/authStore';
import { Permission, ROLE_PERMISSIONS } from '../types';

export function usePermissions() {
  const { businessProfile } = useAuthStore();
  const role = businessProfile?.role || 'user';

  const hasPermission = (permission: Permission) => {
    const rolePermissions = ROLE_PERMISSIONS[role];
    return rolePermissions.some(
      p => p.action === permission.action && p.resource === permission.resource
    );
  };

  const canAccessResource = (resource: Permission['resource']) => {
    const rolePermissions = ROLE_PERMISSIONS[role];
    return rolePermissions.some(p => p.resource === resource);
  };

  const canPerformAction = (action: Permission['action'], resource: Permission['resource']) => {
    return hasPermission({ action, resource });
  };

  return {
    role,
    hasPermission,
    canAccessResource,
    canPerformAction,
  };
}