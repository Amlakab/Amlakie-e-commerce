const data = {
    headerMenus: [
      {
        name: "Today's Deal",
        href: '/search?tags=todays-deal',
      },
      {
        name: 'New Arrivals',
        href: '/search?tags=new-arrival',
      },
      {
        name: 'Featured Products',
        href: '/search?tags=featured',
      },
      {
        name: 'Best Sellers',
        href: '/search?tags=best-seller',
      },
      {
        name: 'Browsing History',
        href: '/browsing-history',
      },
      {
        name: 'Customer Service',
        href: '/page/customer-service',
      },
      {
        name: 'About Us',
        href: '/page/about-us',
      },
      {
        name: 'Help',
        href: '/page/help',
      }
    ],      
    carousels: [
        {
          title: 'West Popular Shoes For Sale',
          buttonCaption: 'Shop Now',
          image: '/images/banner6.jpg',
          url: '/search?category=Shoes',
          isPublished: true,
        },
        {
          title: 'Best Sellers in T-Shirts',
          buttonCaption: 'Shop Now',
          image: '/images/banner7.avif',
          url: '/search?category=T-Shirts',
          isPublished: true,
        },
        {
          title: 'Best Deals on Wrist Watches',
          buttonCaption: 'See More',
          image: '/images/banner3.avif',
          url: '/search?category=Wrist Watches',
          isPublished: true,
        },
      ],
  }
  
  export default data;