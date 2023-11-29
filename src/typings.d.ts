type iconId = {
    iconGroup: string;
    iconName: string;
}

type transportPlaceCode = {
    type: string;
    value: string;
}

type lineIcon = {
    type: string;
    iconSource: string;
    name?: string;
    label: string;
    generate?: {
        label: string;
        color?: string;
        radius: number;
        textColor?: string;
    },
    iconId?: iconId;
}

type transportPlace = {
    id: string;
    label: string;
    description: string;
    type: {
        label: string;
        iconId: iconId;
    };
    codes: transportPlaceCode[];
    linesIcons: lineIcon[];
    lines: any;
    highlight: any;
}

type Address = {
    id: string;
    label: string;
    type: {
        label: string;
        iconId: iconId;
    };
    codes: any;
    highlight: any;
    linesIcons: any;
    lines: any;
}

type searchStationResponse = {
    places: {
        transportPlaces: transportPlace[];
        addresses?: Address[];
        pois?: Address[];
        commonSearches?: any[];
    }
}

type Line = {
    name: string;
    network: string;
    mode: string;
    id: string;
    iconId: iconId;
    semanticLabel: string;
}

type transporterIcon = {
    type: string;
    iconSource: string;
    label: string;
    iconId: iconId;
}

type VehicleInfo = {
    label: string;
    shortLabel: string;
    icons: lineIcon[],
    transporterIcons: transporterIcon[],
    format?: {
        color: string;
        textColor: string;
    }
}

type TrainRequestObject = {
    number: string;
    date: string;
    origin: string;
    destination: string;
}

type TrainItem = {
    timeLabel: string;
    timeLabelDisrupted: string;
    semanticsTimeLabelInfo: string;
    vehicleInfo: VehicleInfo;
    vehicleDirection: {
        mainDirectionLabel: string;
        displayType: string;
    };
    fromOrToStationLabel: string;
    platformTypeLabel: string;
    platformLabel: string;
    compositionLabel?: string;
    vehicleDetails: {
        screenTitle: string;
        request: TrainRequestObject;
    }
    semantics: string;
}

type urbanLineBoard = {
    items: TrainItem[];
    isFavorite: boolean;
    favoriteMetas?: {
        isMainLine?: boolean;
        line: Line;
        destinationId: string;
        isDeparture: boolean;
    }
}

type Board = {
    mainLineBoards?: {
        departuresBoardTitle: string;
        departuresBoard: {
            items: TrainItem[];
        };
        arrivalsBoardTitle: string;
        arrivalsBoard: {
            items: TrainItem[];
        };
    }
    urbanDestinationsBoards?: {
        destinations: string[];
        boardByDestinations: {
            [destination: string]: urbanLineBoard;
        };
        trafficInfosByLine: {messages: any[]};
    }
}

type stationBoard = {
    station: {
        id: string;
        label: string;
        isFavorite: boolean;
        lines: Line[];
    };
    boardsByLineId?: {
        [lineId: string]: Board;
    }
}

type DisruptionMessage = {
    type: string;
    disruptionType: string;
    icon: iconId;
    title: string;
    trainLabel: string;
    message: string;
}

type Stop = {
    locationLabel: string;
    timeLabel: string;
    timeDisruptionLabel: string;
    informationDisruptionLabel: {
        icon?: string;
        message?: string;
    };
    durationLabel: string;
    hasDurationDisruption: boolean;
    platformLabel: string;
    informationSegmentType: string;
    semanticDurationLabel: string;
    semanticTimeDisruptedLabel: string;
    semanticStopTypeLabel: string;
}

type Traject = {
    screenTitle: string;
    destination: string;
    disruptions?: {
        messages?: DisruptionMessage[]
    };
    lineDetailStops: Stop[];
}
