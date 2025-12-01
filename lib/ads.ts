/**
 * Google AdSense Configuration
 * Centralized ad slot IDs for easy management
 */

export const AD_CLIENT = "ca-pub-5962590910003151";

export const AD_SLOTS = {
  // Responsive Multiplex Vertical - Best for bottom of page (High RPM filler)
  MULTIPLEX_VERTICAL: "2611794429",
  
  // Responsive Display Vertical - Best for sidebars or vertical spaces
  DISPLAY_VERTICAL: "1166850818",
  
  // Responsive Display Horizontal - Best for top of page (Highest CTR)
  DISPLAY_HORIZONTAL: "8536529787",
  
  // Responsive Display Square - Best for after content sections
  DISPLAY_SQUARE: "2252701774",
} as const;