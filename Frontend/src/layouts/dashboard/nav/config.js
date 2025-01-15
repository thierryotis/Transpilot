// component
import SvgColor from '../../../component/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Tableau de bord',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    visibility:true
  },
  {
    title: 'Chargements',
    path: '/dashboard/chargement',
    icon: icon('ic_blog'),
    visibility:true
  },
  {
    title: 'Dechargements',
    path: '/dashboard/dechargement',
    icon: icon('ic_blog'),
    visibility:true
  },
  {
    title: 'Prestataires',
    path: '/dashboard/proprio',
    icon: icon('ic_user'),
    visibility:true
  },
  {
    title: 'Chauffeurs',
    path: '/dashboard/chauffeur',
    icon: icon('ic_user'),
    visibility:true
  },
  {
    title: 'Bennes',
    path: '/dashboard/benne',
    icon: icon('ic_user'),
    visibility:true
  },
  {
    title: 'Tracteurs',
    path: '/dashboard/tracteur',
    icon: icon('ic_user'),
    visibility:true
  },
  {
    title: 'Produits',
    path: '/dashboard/produit',
    icon: icon('ic_user'),
    visibility:true
  },
  {
    title: 'Utilisateurs',
    path: '/dashboard/ajoututilisateur',
    icon: icon('ic_user'),
    visibility:true
  },
  
  {
    title: 'Deconnexion',
    path: '/logout',
    icon: icon('ic_lock'),
    visibility:true
  },
];

export default navConfig;