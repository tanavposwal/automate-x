import axios from "axios";

const TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const ITEM_URL = (id: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

async function fetchFirstHackerNewsTitle() {
  try {
    const { data: storyIds } = await axios.get(TOP_STORIES_URL);
    const { data: firstStory } = await axios.get(ITEM_URL(storyIds[0]));
    return firstStory.title;
  } catch (error) {
    return;
  }
}

async function createATwitterPost(text: string) {
  const response = await fetch(
    "https://x.com/i/api/graphql/BjT3MvG1CwfTuJxTLX4ovg/CreateTweet",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,hi;q=0.8",
        authorization:
          "Bearer YOUR_BEARER_TOKEN",
        "content-type": "application/json",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client-transaction-id":
          "YOUR_TRANSACTION_ID",
        "x-client-uuid": "YOUR_UUID",
        "x-csrf-token":
          "YOUR_CSRF_TOKEN",
        "x-twitter-active-user": "yes",
        "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-client-language": "en",
        cookie: "YOUR_COOKIES",
        Referer: "https://x.com/home",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: `{"variables":{"tweet_text":"${ text+" ~ by bot 😁" }","dark_request":false,"media":{"media_entities":[],"possibly_sensitive":false},"semantic_annotation_ids":[],"disallowed_reply_options":null},"features":{"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"creator_subscriptions_quote_tweet_preview_enabled":false,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"profile_label_improvements_pcf_label_in_post_enabled":false,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":true,"articles_preview_enabled":true,"rweb_video_timestamps_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_enhance_cards_enabled":false},"queryId":"BjT3MvG1CwfTuJxTLX4ovg"}`,
      method: "POST",
    },
  );

  const json = await response.json();
  console.log(json);
}

async function makePost() {
  const title = await fetchFirstHackerNewsTitle();
  if (title) {
    createATwitterPost(title);
    console.log()
  } else {
    console.log("News not found");
  }
}

makePost();
