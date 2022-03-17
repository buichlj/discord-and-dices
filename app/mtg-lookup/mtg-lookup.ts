import { RequestService } from "../request-service/request.service";

export class MTGLookup {
    private readonly scryFallUrl = 'https://api.scryfall.com/cards/named?fuzzy=';

    public async lookupCard(message: string): Promise<string> {
        let returnString = '';
        try {
            const requestService = new RequestService();
            message = message.replace('$mtg', '');

            const card = await requestService.get(this.scryFallUrl + message) as any;

            if (card && card.status == 404) {
                returnString = 'Could not find card. Try spelling it better or adding more characters.'
            } else if (card && card.object == 'error') {
                returnString = `There was problems talking to scryfall: ${card.status}`
            } else if (card && card.object == 'card') {
                returnString = card.image_uris.large;
            }

        } catch (ex) {
            returnString = 'Error getting card, try and be better.';
        }

        return returnString;
    }
}