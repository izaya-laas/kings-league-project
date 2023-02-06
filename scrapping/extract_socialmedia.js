export function extractSocialMedia($) {
  const $socialMedia = $('.uk-text-right div div a')

  const socialMedias = {}

  $socialMedia.each((_, media) => {
    const $media = $(media)

    const href = $media.attr('href')

    const span = $media.find('span').attr('uk-icon')
    const socialMedia = span.slice(5, -1).trim()

    if (socialMedias[socialMedia]) {
      const copy = socialMedias[socialMedia]

      socialMedias[socialMedia] = [copy, { href }]
    } else {
      socialMedias[socialMedia] = { href }
    }
  })

  return socialMedias
}
