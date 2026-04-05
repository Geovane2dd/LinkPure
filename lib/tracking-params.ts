/*
 * LinkPure - Tracking Parameters Database
 * Copyright (C) 2024 GeovaneDD
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// Comprehensive list of tracking parameters from various platforms
// Based on public research and common tracking patterns

export const TRACKING_PARAMETERS = {
  // Universal tracking parameters (UTM codes)
  universal: [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    'utm_id', 'utm_cid', 'utm_reader', 'utm_referrer', 'utm_name',
    'utm_social', 'utm_social-type', 'utm_creative', 'utm_keyword',
    'utm_matchtype', 'utm_network', 'utm_device', 'utm_placement',
    'utm_position', 'utm_adgroup', 'utm_adset', 'utm_campaignid',
    'utm_adid', 'utm_creativeid', 'utm_siteid', 'utm_landingpage'
  ],

  // Affiliate and referral parameters
  affiliate: [
    'ref', 'referrer', 'referral', 'affiliate', 'aff', 'aff_id', 'affiliate_id',
    'partner', 'partner_id', 'tag', 'tags', 'aid', 'a_id', 'sub_id', 'sub_id1',
    'sub_id2', 'sub_id3', 'sub_id4', 'sub_id5', 'click_id', 'clickid',
    'pub_id', 'pubid', 'publisher', 'publisher_id', 'source_id', 'src_id'
  ],

  // Session and user tracking
  session: [
    'session_id', 'sessionid', 'sess_id', 'sid', 'session', 'user_id', 'userid',
    'user', 'uid', 'uuid', 'visitor_id', 'visitorid', 'vid', 'cid', 'client_id',
    'clientid', 'customer_id', 'customerid', 'member_id', 'memberid'
  ],

  // Analytics and marketing
  analytics: [
    'ga', 'ga_source', 'ga_medium', 'ga_campaign', 'ga_term', 'ga_content',
    'ga_id', 'ga_cid', 'ga_sid', 'ga_sr', 'ga_sc', 'ga_gclid', 'gclid',
    'fbclid', 'fbclid', 'msclkid', 'msclkid', 'ttclid', 'ttclid', 'twclid',
    'twclid', 'igshid', 'igshid', 'mc_cid', 'mc_eid', '_ga', '_gid', '_gat',
    '_gac', '_utmz', '_utma', '_utmb', '_utmc', '_utmv', '__utmz', '__utma',
    '__utmb', '__utmc', '__utmv'
  ],

  // E-commerce specific
  ecommerce: [
    'campaign_id', 'campaignid', 'ad_id', 'adid', 'adgroup_id', 'adgroupid',
    'creative_id', 'creativeid', 'placement_id', 'placementid', 'site_id',
    'siteid', 'zone_id', 'zoneid', 'banner_id', 'bannerid', 'promo_id',
    'promoid', 'offer_id', 'offerid', 'deal_id', 'dealid'
  ],

  // Social media tracking
  social: [
    'fb_action_ids', 'fb_action_types', 'fb_source', 'fb_ref', 'fbclid',
    'action_object_map', 'action_type_map', 'action_ref_map', 'gs_l',
    'gs_m', 'gs_r', 'gs_u', 'gs_p', 'gs_s', 'gs_t', 'gs_e', 'gs_c',
    'tw_source', 'tw_campaign', 'twclid', 'igshid', 'li_fat_id'
  ],

  // Platform-specific parameters
  platform: {
    amazon: [
      'tag', 'ascsubtag', 'creativeASIN', 'linkCode', 'link_code', 'linkId',
      'camp', 'creative', 'adid', 'source', 'publisher', 'qid', 'sr',
      'keywords', 'field-keywords', 'sprefix', 'crid', 'cv_ct_id', 'cv_ct_pg',
      'cv_ct_wn', 'cv_ct_cx', 'pf_rd_p', 'pf_rd_r', 'pf_rd_t', 'pf_rd_i',
      'pf_rd_m', 'pf_rd_s', 'pd_rd_wg', 'pd_rd_w', 'pd_rd_r', 'pd_rd_i',
      'ref_', 'ref', 'node', 'psc', 'smid', 'dchild', 'qid', 'sr', 'th',
      'psc', 'refRID', 'refRIDPath', 'useRedirectOnSuccess', 'redirectToASL',
      'redirectToAmazon', 'should_redirect', 'redirector', 'aaxitk', 'hsa_cr_id'
    ],
    aliexpress: [
      'spm', 'srcSns', 'businessType', 'templateId', 'currency', 'language',
      'src', 'pdp_npi', 'algo_pvid', 'algo_exp_id', 'sku_id', 'sourceType',
      'spreadType', 'bizType', 'social_params', 'aff_platform', 'aff_trace_key',
      'terminal_id', 'aff_short_key', 'algo_expid', 'algo_pvid', 'btsid',
      'ws_ab_test', 'initiative_id', 'aff_fcid', 'tt', 'afSmartRedirect',
      'gatewayAdapt', 'gatewayAdapt', 'pvid', 'scm', 'scm_id', 'scm-url',
      'pvid', 'utparam', 'sk', 'cv', 'af', 'cpt', 'dp', 'mall_mix', 'm', 's',
      'cv', 'af', 'cpt', 'dp', 'mall_mix', 'm', 's', 'aff_fsk', 'aff_fsk',
      'aff_platform', 'aff_trace_key', 'terminal_id', 'initiative_id',
      'aff_fcid', 'tt', 'afSmartRedirect', 'gatewayAdapt', 'pvid', 'scm',
      'scm_id', 'scm-url', 'pvid', 'utparam', 'sk', 'cv', 'af', 'cpt', 'dp',
      'mall_mix', 'm', 's', 'cv', 'af', 'cpt', 'dp', 'mall_mix', 'm', 's'
    ],
    mercadolivre: [
      'ref', 'matt_tool', 'forceInApp', 'from', 'tracking_id', 'position',
      'searchVariation', 'deal_print_id', 'sponsored', 'ad_position',
      'ad_click_id', 'campaign_id', 'ad_creative', 'ad_format', 'ad_size',
      'ad_type', 'ad_network', 'ad_placement', 'ad_group', 'ad_keyword',
      'ad_matchtype', 'ad_device', 'ad_os', 'ad_browser', 'ad_country',
      'ad_region', 'ad_city', 'ad_zip', 'ad_age', 'ad_gender', 'ad_interest',
      'ad_behavior', 'ad_retargeting', 'ad_remarketing', 'ad_custom_audience'
    ],
    shopee: [
      'uls_trackid', 'utm_campaign', 'utm_content', 'utm_medium', 'utm_source',
      'utm_term', 'smtt', 'campaignid', 'smcid', 'smcn', 'smtc', 'smvid',
      'itemid', 'shopid', 'smclient', 'smsrc', 'smdevice', 'smos', 'smbrowser',
      'smcountry', 'smregion', 'smcity', 'smzip', 'smage', 'smgender',
      'sminterest', 'smbehavior', 'smretargeting', 'smremarketing',
      'smcustomaudience', 'deep_and_deferred', 'deep_link', 'shortlink',
      'referral_code', 'invite_code', 'promo_code', 'voucher_code'
    ],
    banggood: [
      'cur_warehouse', 'ID', 'rmmds', 'p', 'custlinkid', 'af', 'cpt', 'dp',
      'mall_mix', 'm', 's', 'cv', 'af', 'cpt', 'dp', 'mall_mix', 'm', 's',
      'cv', 'af', 'cpt', 'dp', 'mall_mix', 'm', 's', 'cv', 'af', 'cpt', 'dp',
      'mall_mix', 'm', 's', 'cv', 'af', 'cpt', 'dp', 'mall_mix', 'm', 's',
      'cur_warehouse', 'ID', 'rmmds', 'p', 'custlinkid', 'af', 'cpt', 'dp',
      'mall_mix', 'm', 's', 'cv', 'af', 'cpt', 'dp', 'mall_mix', 'm', 's',
      'cv', 'af', 'cpt', 'dp', 'mall_mix', 'm', 's', 'cv', 'af', 'cpt', 'dp',
      'mall_mix', 'm', 's', 'cv', 'af', 'cpt', 'dp', 'mall_mix', 'm', 's'
    ],
    youtube: [
      'feature', 'ab_channel', 'v', 't', 'start', 'end', 'list', 'index',
      'playnext', 'autoplay', 'loop', 'playlist', 'shuffle', 'continue',
      'disable_polymer', 'app', 'noapp', 'nohtml5', 'html5', 'persist_html5',
      'wide', 'narrow', 'fs', 'nofs', 'hd', 'nohd', 'sd', 'nosd', 'cc_load_policy',
      'cc_lang_pref', 'iv_load_policy', 'hl', 'gl', 'theme', 'color', 'rel',
      'showinfo', 'showsearch', 'modestbranding', 'controls', 'autohide',
      'wmode', 'egm', 'egm', 'version', 'ytsession', 'pbj', 'pbjreload',
      'redirector', 'event', 'action', 'src', 'client', 'app_version',
      'client_screen', 'device', 'os', 'os_version', 'browser', 'browser_version',
      'screen', 'resolution', 'touch', 'gl', 'hl', 'cr', 'ip', 'ipbits',
      'expire', 'sparams', 'signature', 'key', 'ratebypass', 'fallback_host',
      'id', 'itag', 'source', 'requiressl', 'mm', 'mn', 'ms', 'mv', 'pl',
      'initcwndbps', 'ei', 'lact', 'cl', 'mos', 'c', 'cver', 'cplayer',
      'cbr', 'cbrver', 'cos', 'cosver', 'cplatform', 'cbrand', 'cmodel',
      'cnetwork', 'ctype', 'cosname', 'cosver', 'cplatform', 'cbrand',
      'cmodel', 'cnetwork', 'ctype', 'cosname', 'cosver', 'cplatform',
      'cbrand', 'cmodel', 'cnetwork', 'ctype', 'cosname', 'cosver'
    ]
  }
};

// Combine all tracking parameters into a single set for easy removal
export const ALL_TRACKING_PARAMETERS = new Set([
  ...TRACKING_PARAMETERS.universal,
  ...TRACKING_PARAMETERS.affiliate,
  ...TRACKING_PARAMETERS.session,
  ...TRACKING_PARAMETERS.analytics,
  ...TRACKING_PARAMETERS.ecommerce,
  ...TRACKING_PARAMETERS.social,
  ...TRACKING_PARAMETERS.platform.amazon,
  ...TRACKING_PARAMETERS.platform.aliexpress,
  ...TRACKING_PARAMETERS.platform.mercadolivre,
  ...TRACKING_PARAMETERS.platform.shopee,
  ...TRACKING_PARAMETERS.platform.banggood,
  ...TRACKING_PARAMETERS.platform.youtube
]);

// Function to get platform-specific parameters
export function getPlatformParameters(platform: string): string[] {
  const platformKey = platform.toLowerCase();
  if (platformKey in TRACKING_PARAMETERS.platform) {
    return TRACKING_PARAMETERS.platform[platformKey as keyof typeof TRACKING_PARAMETERS.platform];
  }
  return [];
}

// Function to check if a parameter is a tracking parameter
export function isTrackingParameter(param: string): boolean {
  return ALL_TRACKING_PARAMETERS.has(param.toLowerCase());
}