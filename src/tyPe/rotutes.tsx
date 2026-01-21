

// export const adminroutes = [
//     {
//       title: "Admin mangement",
     
//       items: [
//         {
//           title: "Write Blog",
//           url: "/dashboard/Writeblog",
//         },
//         {
//           title: "Admin Dashboard",
//           url: "/admin-dashboar",
//         },
        
//       ],
//     },
// ]

export interface Routes {
    title: string;
    items: {
      title: string;
      url: string;
    }[];
}