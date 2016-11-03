#pragma strict

public class CameraSettings extends MonoBehaviour
{
	private static var instance : CameraSettings;
	
	public static function Instance() : CameraSettings
	{
		return instance;
	}
	
	// General Settings
	var xCamSpeed : float;
	var yCamSpeed : float;
	var camDistance : float;
	
	// Zone Settings
	var relativeCamPos : Vector3;
	var relativeLookPos : Vector3;
	
	function Awake()
	{
		instance = this;
		
		// Camera
		xCamSpeed = 2.5f;
		yCamSpeed = 2.5f;
		camDistance = 6.0f;
	}
}