import { RequestService } from "../request-service/request.service";

export class MTGLookup {
    private readonly scryFallUrl = 'https://api.scryfall.com/cards/named?fuzzy=';
    private readonly scryFallAutoCompleteUrl = 'https://api.scryfall.com/cards/autocomplete?q=';

    public async lookupCard(message: string): Promise<string> {
        let returnString = '';
        try {
            const requestService = new RequestService();
            message = message.replace('$mtg', '');

            const card = await requestService.get(this.scryFallUrl + message) as any;

            if (card && card.status == 404) {
                returnString = 'Could not find card. Try spelling it better or adding more characters, idiot.'
                const catalog = await requestService.get(this.scryFallAutoCompleteUrl + message) as any;
                if (catalog?.data?.length > 0) {
                    returnString = 'Did you mean: \n';
                    returnString += catalog.data.slice(0, 10).join('\n');
                }
            } else if (card && card.object == 'error') {
                returnString = `There was problems talking to scryfall: ${card.status}`
            } else if (card && card.object == 'card') {
                if (card.card_faces) {
                    returnString = card.card_faces[0].image_uris.large + '\n' + card.card_faces[1].image_uris.large;
                } else {
                    returnString = card.image_uris.large;
                }
            }

        } catch (ex) {
            returnString = 'Error getting card, try and be better.';
        }

        return returnString;
    }
}