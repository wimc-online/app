import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
    createLeafletElement() {
        const { map } = this.props;
        let leafletElement = L.Routing.control({
            waypoints: [L.latLng(this.props.from.lat, this.props.from.lng), L.latLng(this.props.to.lat, this.props.to.lng)],
            createMarker: function() { return null; },
        }).addTo(map.leafletElement);
        return leafletElement.getPlan();
    }
}
export default withLeaflet(Routing);