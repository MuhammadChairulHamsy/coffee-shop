// "use client";

// import React from "react";
// import { Wallet, ShoppingBag, Boxes, Award, LucideIcon } from "lucide-react";
// import { OverviewCardItem } from "@/types/overview";
// import { cn } from "@/lib/utils";

// const iconMap: Record<OverviewCardItem["iconName"], LucideIcon> = {
//   Wallet,
//   ShoppingBag,
//   Boxes,
//   Award,
// };

// export const OverviewCard = React.memo<OverviewCardItem>(({
//   title,
//   value,
//   iconName,
//   iconBgColor,
//   iconColor,
//   trendBadge,
//   progressBar,
//   footerDetails,
// }) => {
//   const Icon = iconMap[iconName] || Wallet;

//   return (
//     <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-sidebar p-5 shadow-xs transition-all duration-300 hover:shadow-md">
//       <div
//         className={cn(
//           "absolute -right-6 -bottom-6 h-24 w-24 rounded-full opacity-10 blur-xl transition-opacity group-hover:opacity-20",
//           iconBgColor
//         )}
//       />

//       <div>
//         <div className="flex items-center justify-between gap-2">
//           <h2 className="text-[11px] font-bold tracking-wider text-muted-foreground/80 uppercase">
//             {title}
//           </h2>
//           <div
//             className={cn(
//               "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105",
//               iconBgColor
//             )}
//           >
//             <Icon className={cn("h-4 w-4", iconColor)} />
//           </div>
//         </div>

//         <div className="mt-2 flex items-baseline gap-2">
//           <p className="text-2xl font-bold tracking-tight text-foreground">
//             {value}
//           </p>
//         </div>

//         {trendBadge && (
//           <div className="mt-2 flex items-center gap-1.5">
//             <span
//               className={cn(
//                 "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
//                 trendBadge.type === "positive" && "bg-emerald-50 text-emerald-600",
//                 trendBadge.type === "warning" && "bg-amber-100/70 text-amber-700 border border-amber-200/50",
//                 trendBadge.type === "neutral" && "bg-slate-100 text-slate-600"
//               )}
//             >
//               {trendBadge.text}
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="mt-5 border-t border-border/20 pt-3">
//         {progressBar && (
//           <div className="flex items-center justify-between gap-3">
//             <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
//               <div
//                 className="h-full rounded-full bg-[#5D3A29] transition-all duration-500"
//                 style={{ width: `${Math.min(100, Math.max(0, progressBar.value))}%` }}
//               />
//             </div>
//             {progressBar.label && (
//               <span className="shrink-0 text-xs font-semibold text-muted-foreground">
//                 {progressBar.label}
//               </span>
//             )}
//           </div>
//         )}

//         {footerDetails && footerDetails.length > 0 && (
//           <div className="grid grid-cols-2 gap-2 text-xs">
//             {footerDetails.map((detail, idx) => (
//               <div key={idx} className="flex flex-col">
//                 <span className="text-[11px] text-muted-foreground/80 leading-tight">
//                   {detail.label}
//                 </span>
//                 <span className="font-medium text-foreground mt-0.5">
//                   {detail.value}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// });

// OverviewCard.displayName = "OverviewCard";