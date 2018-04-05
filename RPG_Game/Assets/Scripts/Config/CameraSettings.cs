using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraSettings : MonoBehaviour {

    private static CameraSettings instance;
	
	public static CameraSettings Instance()
	{
		return instance;
	}

    // General Settings
    public float xCamSpeed;
	public float yCamSpeed;
	public float camDistance;

    // Zone Settings
    public Vector3 relativeCamPos;
    public Vector3 relativeLookPos;
	
	void Awake()
    {
        instance = this;

        // Camera
        xCamSpeed = 2.5f;
        yCamSpeed = 2.5f;
        camDistance = 6.0f;
    }
}
