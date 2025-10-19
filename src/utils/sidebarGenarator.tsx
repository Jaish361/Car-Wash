import { NavLink } from 'react-router-dom';

const SidebarGenerator = (items: any[], role: string) => {
  if (!items || items.length === 0) return [];
  
  return items.map((item) => {
    // Handle parent items with children
    if (item.children) {
      return {
        key: item.name,
        label: item.name,
        children: item.children.map((child: any) => ({
          key: child.path,
          label: (
            <NavLink to={`/${role}/${child.path}`}>
              {child.name}
            </NavLink>
          ),
        })),
      };
    }
    
    // Handle regular items
    return {
      key: item.path,
      label: (
        <NavLink to={`/${role}/${item.path}`}>
          {item.name}
        </NavLink>
      ),
    };
  });
};

export default SidebarGenerator;