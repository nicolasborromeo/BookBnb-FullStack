const fetch = async () => {
    try {
        const res = await csrfFetch('/api/spots', {
            method: 'POST',
            body: JSON.stringify(newSpot),
        });

        if (!res.ok) throw res

        const data = await res.json()

        const spotId = data.id;



        for (const img in images) {
            let isPreview = img == 1 ? true : false;
            const body = {
                url: images[img],
                preview: isPreview,
            };

            const imgResponse = await csrfFetch(`/api/spots/${spotId}/images`, {
                method: 'POST',
                body: JSON.stringify(body),
            });
            if (!imgResponse.ok) {

                const imgError = await imgResponse.json()
                throw Error(imgError)
            }
        }

        console.log('Spot created successfully:', data);
        navigate(`/spots/${data.id}`, { replace: true });

    } catch (error) {
        switch (error.status) {
            case 401: window.alert('You must be logged in to create a Spot');
                break;
            case 400: {
                window.alert('Invalid Spot Information, please make sure you complete all the reuired fields')
            }
                break;
            default: setErrors({ error: 'Sorry, there was an error creating the Spot' });
        }

    }

}
fetch()
