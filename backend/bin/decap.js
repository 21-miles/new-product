const decapConfig = (
  gitRepo,
  siteUrl,
  cloudName,
  cloudApiKey,
  markLogo,
  nextVersion,
  version
) => `backend:
  name: git-gateway
  repo: ${gitRepo}
  branch: master
  site_domain: ${siteUrl}

media_folder: "blog/public/posts"
public_folder: ""
media_library:
  name: cloudinary
  config:
    cloud_name: ${cloudName}
    api_key: ${cloudApiKey}

publish_mode: simple

logo_url: ${markLogo}

slug:
  encoding: "ascii"
  clean_accents: true

collections:
  - name: post
    label: Posts
    folder: brand/posts
    label_singular: Post
    view_groups:
      - label: Authors
        field: author
      - label: Featured Post
        field: featuredPost
      - label: Categories
        field: categories
    view_filters:
      - label: Drafts
        field: draft
        pattern: true
    sortable_fields: ['date', 'title']
    description: >
      Markdown posts.
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string", required: true }
      - {
          label: "Publish Date",
          name: "date",
          widget: "datetime",
          format: "YYYY-MM-DD HH:mm:ss",
          required: true,
        }
      - { label: "Author", name: "author", widget: "string", default: "Boilerplate Times" }
      - {
          label: "Categories",
          name: "categories",
          widget: "list",
          required: true,
        }
      - { label: "Tags", name: "tag", widget: "list" }
      - {
          label: "Featured Image",
          name: "image",
          widget: image,
          required: true,
        }
      - {
          label: "Featured Post",
          name: "featuredPost",
          widget: "boolean",
          default: false,
        }
      - {
          label: "Draft Mode",
          name: "draft",
          widget: "boolean",
          default: false,
        }
      - { label: "Body", name: "body", widget: "markdown", required: true }
      - { label: "Type", name: "layout", widget: "hidden", default: "post" }
  - name: pages
    label: Pages
    label_singular: "Page"
    folder: brand/pages
    create: true
    # adding a nested object will show the collection folder structure
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string", required: true }
      - { label: "Body", name: "body", widget: "markdown", required: true }
      - { label: "Type", name: "layout", widget: "hidden", default: "page" }
      - {
          label: "Publish Date",
          name: "date",
          widget: "datetime",
          format: "YYYY-MM-DD HH:mm:ss",
          required: true,
        }
      - { label: "Description", name: pageDescription, widget: "string" }
  - name: "ai_drafts"
    label: "Prompts"
    folder: "brand/ai_drafts"
    create: true
    editor:
      preview: false
    slug: "{{slug}}"
    fields:
      - { label: "Prompt Name", name: "title", widget: "string", required: true }
      - { label: "Web Scraping URL Links", name: "linkAiDraft", widget: "list", required: false, hint: https://someportal.com/breaking-news-today}
      - { label: "Author", name: "author", widget: "relation", collection: "ai_authors", search_fields: ["title"], value_field: "title", display_fields: ["title"] }
      - { label: "Use Author's Prompt", name: "authorsPrompt", widget: "boolean", default: true, required: false }
      - { label: "Use Universal Prompt", name: "universalPrompt", widget: "boolean", default: true, required: false }
      - { label: "Main Prompt", name: "body", widget: "markdown", required: false }
      - { label: "Main Image Prompt", name: "main_image_prompt", widget: "markdown", required: false }
      - { label: "Additional Image Prompts", name: "additional_image_prompts", widget: "list", required: false, fields: [{ label: "Image Prompt", name: "image_prompt", widget: "markdown" }] }
      - { label: "Category", name: "category", widget: "string", required: false }
  - name: "ai_authors"
    label: "Authors"
    folder: "brand/ai_authors"
    create: true
    editor:
      preview: false
    slug: "{{slug}}"
    fields:
      - { label: "Name", name: "title", widget: "string" }
      - { label: "Author's Prompt", name: "body", widget: "markdown", required: true }
  - name: settings
    label: "Settings"
    delete: false # Prevent users from deleting documents in this collection
    editor:
      preview: false
    files:
      - name: "autoPost"
        label: "Auto Post"
        file: "brand/settings/autoPost.json"
        description: "Automatic posting functionality"
        fields:
          - label: "Auto Posts - References"
            label_singular: Reference
            required: false
            name: aiUrlSource
            allow_add: true
            allow_delete: true
            allow_multiple: true
            max: 10
            min: 1
            widget: "list"
            fields:
              - { label: "Href", name: href, widget: "string" }
          - label: "Auto Posts - Frequency"
            name: aiUrlFrequency
            widget: select
            options:
              - "Off"
              - "Daily"
              - "Every (n) days"
              - "Weekly"
              - "Monthly"
              - "Once"
            default: "Off"
            hint: "Use this parameter for the monthly day."
            required: false
          - label: "Auto Posts - Weekly Frequency"
            name: weeklyPostDay
            widget: select
            default: "Monday"
            options:
              - "Monday"
              - "Tuesday"
              - "Wednesday"
              - "Thursday"
              - "Friday"
              - "Saturday"
              - "Sunday"
            hint: "Select the day of the week for weekly auto posts. Applies to Weekly and Every X Days settings."
            required: false
          - label: "Auto Posts - Every (n) Days"
            name: everyXDays
            widget: number
            default: 1
            min: 1
            max: 31
            hint: "Specify how many days between posts."
            required: false
          - label: "Auto Posts - Hour"
            name: autoPostHourTime
            widget: number
            default: 8
            min: 0
            max: 23
            hint: "Specify hour to create posts."
            required: false
          - label: "Auto Posts - Minutes"
            name: autoPostMinutesTime
            widget: number
            default: 0
            min: 0
            max: 59
            hint: "Specify hour to create posts."
            required: false
          - label: "Auto Post Hour (Timezone) - Not Working (only Los Angeles)"
            name: timezone
            widget: select
            options:
              - "UTC-08:00 (Los Angeles, Pacific Time)"
              - "UTC-07:00 (Denver, Mountain Time)"
              - "UTC-06:00 (Chicago, Central Time)"
              - "UTC-05:00 (New York, Eastern Time)"
              - "UTC-04:00 (Caracas, Venezuela)"
              - "UTC-03:00 (São Paulo, Brazil)"
              - "UTC-02:00 (Fernando de Noronha, Brazil)"
              - "UTC-01:00 (Azores, Portugal)"
              - "UTC+00:00 (London, United Kingdom)"
              - "UTC+01:00 (Berlin, Germany)"
              - "UTC+02:00 (Cairo, Egypt)"
              - "UTC+03:00 (Moscow, Russia)"
              - "UTC+04:00 (Dubai, UAE)"
              - "UTC+05:30 (New Delhi, India)"
              - "UTC+06:00 (Dhaka, Bangladesh)"
              - "UTC+07:00 (Bangkok, Thailand)"
              - "UTC+08:00 (Beijing, China)"
              - "UTC+09:00 (Tokyo, Japan)"
              - "UTC+10:00 (Sydney, Australia)"
            default: "UTC-03:00 (São Paulo, Brazil)"
            hint: "Choose the timezone and hour for the auto post schedule. The time is in 24-hour format."
            required: true
      - name: "ai"
        label: "A.I. Settings"
        file: "brand/settings/ai.json"
        description: "A.I. Settings"
        fields:
          - label: "Generate New Post"
            name: newPost
            widget: boolean
            hint: "Set true and save to generate new post."
            default: false
            required: false
          - label: "Train Model (not working)"
            name: trainingModel
            widget: boolean
            hint: "Click when you change your make lot of changes in ai author's and main prompt."
            default: false
            required: false
          - label: "ChatGPT Model"
            name: gptModel
            widget: select
            options:
              - "gpt-4o"
              - "gpt-4o-mini"
              - "gpt-4-turbo"
              - "gpt-4"
              - "gpt-3.5-turbo"
            default: "Off"
            hint: "Turn off or choose how often to generate auto posts."
            required: false
          - label: "Universal Prompt"
            name: body
            widget: markdown
            hint: ""
            required: false
          - label: "MD Transform Content Prompt"
            name: mdTransformPrompt
            widget: markdown
            hint: "Length: The article should be between 750 and 2500 words. Write a 1-2 sentence opening."
            required: false
          - label: "JSON Response Format"
            name: jsonResponse
            widget: markdown
            hint: "{}"
            default: "{}"
            required: false
      - name: "integrations"
        label: "Third-Party Integrations"
        file: "brand/settings/integrations.json"
        description: "Integrations Settings"
        fields:
          - label: "Cloudinary"
            name: cloudinaryIntegration
            widget: "object"
            fields:
              - {
                  label: "Cloud Name (id)",
                  name: "cloudName",
                  widget: string,
                  hint: "xxxxxxxxx",
                  required: false,
                }
              - {
                  label: "Api Key",
                  name: "cloudApiKey",
                  widget: string,
                  hint: "xxxxxxxxx",
                  required: false,
                }
              - {
                  label: "Folder Name",
                  name: "folderName",
                  widget: string,
                  required: false,
                }
          - label: "Google"
            name: googleIntegration
            widget: "object"
            fields:
              - {
                  label: "AdSense Account",
                  name: "adsAccount",
                  widget: string,
                  hint: "sites-xxxxxxxxxxx",
                  required: false,
                }
              - {
                  label: "Ads Client ID",
                  name: "adsClientID",
                  widget: string,
                  hint: "ca-pub-",
                  required: false,
                }
              - {
                  label: "AdSense Slot",
                  name: "adsSlot",
                  widget: string,
                  hint: "xxxxxxxxx",
                  required: false,
                }
              - {
                  label: "Analytics ID",
                  name: "gaID",
                  widget: string,
                  hint: "G-",
                  required: false,
                }              
      - name: "business"
        label: "Business Settings"
        file: "brand/settings/business.json"
        description: "Business Settings"
        fields:
          - label: "Brand Name"
            name: brandName
            widget: string
            required: true
          - label: "Brand Description"
            name: brandDescription
            widget: string
            required: true
            default: Boilerplate Times description.
          - label: "Brand Phone"
            name: brandPhone
            widget: string
            required: false
            default: "+1"
            hint: "+1 XXXXXXXX"
          - label: "Brand Email"
            name: brandEmail
            widget: string
            required: true
          - label: "Brand Keywords"
            name: brandKeywords
            widget: "list"
            required: false
      - name: "theme"
        label: "Theme Settings"
        file: "brand/settings/theme.json"
        description: "General Site Settings"
        fields:
          - label: "General Settings"
            name: "generalThemeSettings"
            widget: "object"
            fields:
              - {
                  label: "Theme Style (NOT WORKING)",
                  name: "themeStyle",
                  widget: select,
                  options: ["0", "1"],
                  required: true,
                  hint: "Default: 0",
                }
              - {
                  label: "Footer Style (NOT WORKING)",
                  name: "footerStyle",
                  widget: select,
                  options: ["0", "1"],
                  required: true,
                  hint: "Default: 0",
                }
          - label: "Theme Colors"
            name: "themeColors"
            widget: "object"
            fields:
              - {
                  label: "Main Brand Color",
                  name: "brand_color",
                  widget: "string",
                  required: true,
                  hint: "#b82632 - Main color.",
                }
              - {
                  label: "CTA Color",
                  name: "ctaColor",
                  widget: "string",
                  required: false,
                  hint: "#ffca0a - Call to Action color.",
                }
              - {
                  label: "Background Color",
                  name: "background_color",
                  widget: "string",
                  required: true,
                  hint: "#00ffc1 - Background color.",
                }
              - {
                  label: "Dark Brand Color",
                  name: "darkBrandColor",
                  widget: "string",
                  required: false,
                }
              - {
                  label: "Dark Secondary Color",
                  name: "secondaryColor",
                  widget: "string",
                  required: false,
                }
              - {
                  label: "Dark Background Color",
                  name: "darkBackgroundColor",
                  widget: "string",
                  required: false,
                }
          - label: "Header"
            name: "header"
            widget: "object"
            fields:
              - {
                  label: "Header Main Menu",
                  name: "headerMainMenu",
                  widget: select,
                  options: ["off", "right", "bottom"],
                  required: true,
                  hint: "Default: true",
                }
              - {
                  label: "Bottom Main Menu",
                  name: "bottomMainMenu",
                  widget: "boolean",
                  required: false,
                  hint: "Default: false",
                }
              - {
                  label: "Header Height",
                  name: "headerHeight",
                  widget: number,
                  default: 60,
                  value_type: "int",
                  min: 50,
                  max: 90,
                  required: false,
                  hint: "Default: 60px",
                }
              - {
                  label: "Header Logo Align",
                  name: "logoAlign",
                  widget: select,
                  options: ["left", "center"],
                  required: false,
                  hint: "Default: Left",
                }
          - label: "Pages settings"
            name: "pagesSettings"
            widget: "object"
            fields:
              - {
                  label: "Page Max-Width",
                  name: "pageMaxW",
                  widget: select,
                  options: ["960", "1024", "1100", "1344"],
                  default: "1100",
                  required: false,
                  hint: "Default:  1100px",
                }
              - {
                  label: "Page Header Padding",
                  name: "pageHeaderPadding",
                  widget: number,
                  default: 20,
                  value_type: "int",
                  min: 0,
                  max: 120,
                  required: false,
                  hint: "Default: 20px.",
                }
              - {
                  label: "Page Bottom Padding",
                  name: "pageBottomPadding",
                  widget: number,
                  default: 30,
                  value_type: "int",
                  min: 0,
                  max: 120,
                  required: false,
                  hint: "Default: 30px.",
                }
          - label: "Posts settings"
            name: "postsSettings"
            widget: "object"
            fields:
              - {
                  label: "Post Style Variation (NOT WORKING)",
                  name: "postStyleVariation",
                  widget: select,
                  options: ["0", "1"],
                  required: true,
                  hint: "Default: 0",
                }
              - {
                  label: "Posts to Show",
                  name: "postsToShow",
                  widget: number,
                  default: 9,
                  value_type: "int",
                  min: 1,
                  max: 9,
                  required: true,
                  hint: "Index page and category pages.",
                }
              - {
                  label: "Post Max-Width",
                  name: "postMaxW",
                  widget: select,
                  options: ["520", "720", "960", "1024", "1100"],
                  default: "1100",
                  required: false,
                  hint: "Default:  1100px",
                }
              - {
                  label: "Left Column - Table of Content",
                  name: "leftColumn",
                  widget: boolean,
                  default: true,
                  required: false,
                  hint: "Default: true.",
                }
              - {
                  label: "Right Column - Related Posts",
                  name: "rightColumn",
                  widget: boolean,
                  default: true,
                  required: false,
                  hint: "Default: true.",
                }
              - {
                  label: "Bottom Row - Related Posts",
                  name: "bottomRow",
                  widget: boolean,
                  default: true,
                  required: false,
                  hint: "Default: true.",
                }
              - {
                  label: "Ads Inside Large Posts (not working)",
                  name: "adsInsidePost",
                  widget: boolean,
                  default: false,
                  required: false,
                }
      - name: "general"
        label: "Site Settings"
        file: "brand/settings/general.json"
        description: "General Site Settings"
        fields:
          - label: "Home Category"
            name: homeCategory
            widget: string
            hint: "Health"
            required: true
          - label: "Publish Date"
            name: publishedDate
            widget: datetime
            format: "YYYY-MM-DD HH:mm:ss"
            required: false
          - label: "Site Url"
            name: siteUrl
            widget: string
            hint: "https://example.com"
            required: true
          - label: "Scope (not working)"
            name: scope
            widget: string
            hint: "https://example.com/blog - The path 'blog' that defines the set of all URLs."
            required: false
          - label: "Cookie Consent"
            name: cookieConsent
            widget: boolean
            hint: "Turn on/off Cookie Consent."
            required: false
            default: false
          - label: "I18n"
            name: i18n
            widget: string
            hint: "en-US"
            required: false
          - label: "Dark Mode Switcher"
            name: darkModeSwitcher
            widget: boolean
            required: false
          - label: "Footer Text"
            name: footerText
            widget: string
            default: "Disclaimer: The content provided on this site is intended for general information purposes only and should not be considered a replacement for professional financial and/or medical advice. All materials, including text, graphics, images, and information, are subject to change without prior notice. The information, materials, terms, conditions, and descriptions presented on these pages are subject to change without prior notice."
            required: false
          - label: "Standard Feedback Subject"
            name: feedbackSubject
            widget: string
            required: false
            default: "Message Request"
            hint: "Message Request"
          - label: "Feedback Email"
            name: feedbackEmail
            widget: string
            required: false
            hint: "your@email.com"
          - label: "Feedback Success Message"
            name: successMessage
            widget: string
            required: false
            hint: "Thank you for your message. We will reach you soon."
          - label: "Feedback Error Message"
            name: errorMessage
            widget: string
            required: false
            hint: "Hmm... something is wrong, try again later or e-mail us: general@boilerplate-timess.com"
      - name: "logos"
        label: "Logos Upload"
        file: "brand/settings/logos.json"
        description: "Logos Upload"
        fields:
          - label: "Main Logo"
            name: mainLogo
            widget: image
            required: true
            hint: "logo.png"
          - label: "Main Logo - WxH"
            name: mainLogoWH
            widget: string
            required: false
            default: "183x50"
            hint: "183x50"
          - label: "Favicon"
            name: faviconLogo
            widget: image
            required: true
            default: Boilerplate Times description.
            hint: "16x16.png"
          - label: "Mark Logo"
            name: markLogo
            widget: image
            required: true
            hint: "Breadcrumb and footer logomark."
          - label: "Shareable Card"
            name: cardLogo
            widget: image
            required: true
            hint: "Social media share image."
          - label: "Post Author Image"
            name: postAuthorLogo
            widget: "image"
            hint: "Squared author profile image."
            required: true
      - name: "mainMenu"
        label: "Main Menu"
        file: "brand/settings/mainMenu.json"
        description: "Main Menu Settings"
        fields:
          - label: "Main Menu"
            label_singular: Item
            name: mainMenu
            allow_add: true
            allow_delete: true
            allow_multiple: true
            max: 6
            min: 1
            widget: "list"
            fields:
              - { label: "Label", name: label, widget: "string" }
              - { label: "Href", name: href, widget: "string" }
      - name: "linkTree"
        label: "Link Tree"
        file: "brand/settings/linkTree.json"
        description: "Link Tree Settings"
        fields:
          - label: "Link Tree"
            label_singular: Item
            name: linkTree
            allow_add: true
            allow_delete: true
            allow_multiple: true
            max: 6
            min: 1
            widget: "list"
            fields:
              - { label: "Label", name: label, widget: "string" }
              - { label: "Href", name: href, widget: "string" }
      - name: "custom"
        label: "Custom Settings"
        file: "brand/settings/custom.json"
        description: "Business Settings"
        fields:
          - label: "RampJS - Segment"
            name: rampSegment
            widget: string
            required: false
          - label: "RampJS - Test Mode"
            name: rampTestMode
            widget: boolean
            required: false
            default: false
          - label: "RampJS - Search Subdomain"
            name: rampSubdomain
            widget: string
            required: false
      - name: "version"
        label: "Version"
        file: "brand/settings/json"
        description: "Version update"
        fields:
          - label: "Check to Update"
            name: update
            widget: boolean
            required: true
            default: false
          - label: "GitHub Repository"
            name: gitRepo
            widget: string
            hint: "miltonbolonha/boilerplate-times - git-username/repo-slug"
            required: true
          - label: "GitHub Username"
            name: gitUser
            widget: string
            hint: "miltonbolonha/boilerplate-times - git-username/repo-slug"
            required: true
          - label: "GitHub E-mail"
            name: gitEmail
            widget: string
            required: true
          - label: "Automatic Updates (not working yet)"
            name: automaticUpdates
            widget: boolean
            required: true
            default: false
            hint: "Automatic update check every Monday."
          - label: "Version"
            name: version
            widget: hidden
            required: false
          - label: "Next Version"
            name: nextVersion
            widget: hidden
            required: false
          - label: "Update System Message."
            name: message
            widget: hidden
            required: false
            hint: "Check to update. New version available: ${nextVersion}."
          - label: "Custom NextJS Source"
            name: customNextSource
            widget: string
            hint: "Set to your own custom \`nextjs/src\` repository."
            required: false
          - label: "Beta Tester (not working yet)"
            name: beta
            widget: boolean
            required: true
            default: false
            hint: "Receive updates for the next version: ${version}."
`;

module.exports = decapConfig;
